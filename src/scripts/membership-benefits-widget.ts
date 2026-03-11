import { DonationAmount } from "@4site/engrid-scripts";

type TierAmount = 50 | 100 | 250 | 500 | 1000;

type TierConfig = {
  amount: TierAmount;
  benefits: string[];
};

const TIERS: TierConfig[] = [
  {
    amount: 50,
    benefits: [
      "A subscription to Preservation magazine",
      "Discounts at over 500 historic places worldwide, including all National Trust Historic Sites, for two adults and all children under 18 in the household",
    ],
  },
  {
    amount: 100,
    benefits: [
      "A subscription to Preservation magazine",
      "Discounts at over 500 historic places worldwide, including all National Trust Historic Sites, for two adults and all children under 18 in the household",
      "Two guest passes to any National Trust Historic Site",
    ],
  },
  {
    amount: 250,
    benefits: [
      "A subscription to Preservation magazine",
      "Discounts at over 500 historic places worldwide, including all National Trust Historic Sites",
      "Up to 30% off the best available rates at Historic Hotels of America",
      "A special quarterly e-newsletter",
      "Exclusive invitations to webinars with National Trust leaders and experts",
      "Two gift memberships to share with family or friends",
    ],
  },
  {
    amount: 500,
    benefits: [
      "A subscription to Preservation magazine",
      "Discounts at over 500 historic places worldwide, including all National Trust Historic Sites",
      "Up to 30% off the best available rates at Historic Hotels of America",
      "A special quarterly e-newsletter",
      "Exclusive invitations to webinars with National Trust leaders and experts",
      "Three gift memberships to share with family or friends",
    ],
  },
  {
    amount: 1000,
    benefits: [
      "A subscription to Preservation magazine",
      "Discounts at over 500 historic places worldwide, including all National Trust Historic Sites",
      "Up to 30% off the best available rates at Historic Hotels of America",
      "Insider communications with the latest news",
      "Exclusive invitations to webinars with National Trust leaders and experts",
      "Invitations to special events",
      "Recognition in our annual report and at events",
      "Four guest passes to any National Trust Historic Site",
      "Four gift memberships to share with family and friends",
    ],
  },
];

export class MembershipBenefitsWidget {
  private readonly container: HTMLElement | null;
  private _amount = DonationAmount.getInstance();

  constructor(selector = ".membership-benefits-widget") {
    this.container = document.querySelector(selector) as HTMLElement | null;
    if (!this.container) return;

    TIERS.sort((a, b) => a.amount - b.amount);

    this.render(this.getActiveTierAmount(this._amount.amount));
    this.addListeners();
  }

  private addListeners() {
    // Donation amount changes should update the widget to show the appropriate tier benefits
    this._amount.onAmountChange.subscribe(() => {
      const amount = this._amount.amount;

      if (amount < TIERS[0].amount || !Number.isFinite(amount)) {
        this.hide();
        return;
      }

      this.render(this.getActiveTierAmount(amount));
    });

    // Clicks on the "Give $X to unlock these benefits" button should update the donation amount to the next tier
    this.container?.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const nextTierAmount = target.getAttribute(
        "data-engrid-next-tier-amount"
      );
      if (nextTierAmount) {
        this._amount.setAmount(Number(nextTierAmount));
      }
    });
  }

  private getActiveTierAmount(amountValue: number): TierAmount {
    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      return 100;
    }

    let resolvedTier: TierAmount = 100;
    for (const tier of TIERS) {
      if (amountValue >= tier.amount) {
        resolvedTier = tier.amount;
      }
    }

    return resolvedTier;
  }

  private render(activeAmount: TierAmount) {
    if (!this.container) return;

    const activeList = this.container.querySelector(
      ".membership-benefits-widget__list--active"
    ) as HTMLElement | null;
    const nextList = this.container.querySelector(
      ".membership-benefits-widget__list--next"
    ) as HTMLElement | null;
    const activeStart = activeList?.offsetHeight ?? 0;
    const nextStart = nextList?.offsetHeight ?? 0;

    this.container.innerHTML = this.getWidgetContent(activeAmount);
    this.container.classList.remove("membership-benefits-widget--hidden");

    const activeListNew = this.container.querySelector(
      ".membership-benefits-widget__list--active"
    ) as HTMLElement | null;
    const nextListNew = this.container.querySelector(
      ".membership-benefits-widget__list--next"
    ) as HTMLElement | null;
    const activeEnd = activeListNew?.offsetHeight?? 0;
    const nextEnd = nextListNew?.offsetHeight ?? 0;
    if (activeListNew) {
      activeListNew.style.height = activeStart + "px";
    }
    if (nextListNew) {
      nextListNew.style.height = nextStart + "px";
    }

    requestAnimationFrame(() => {
      if (activeListNew && activeStart !== activeEnd) {
        activeListNew.style.transition = "height 250ms ease";
        activeListNew.style.height = activeEnd + "px";
      }
      if (nextListNew && nextStart !== nextEnd) {
        nextListNew.style.transition = "height 250ms ease";
        nextListNew.style.height = nextEnd + "px";
      }
    });

    const cleanup = (el: HTMLElement | null) => {
      if (!el) return;
      el.addEventListener(
        "transitionend",
        () => {
          el.style.height = "";
          el.style.transition = "";
        },
        { once: true }
      );
    };

    cleanup(activeListNew);
    cleanup(nextListNew);
  }

  private getWidgetContent(activeAmount: TierAmount): string {
    const activeTierIndex = TIERS.findIndex(
      (tier) => tier.amount === activeAmount
    );
    const activeTier = TIERS[activeTierIndex] ?? TIERS[1];
    const nextTier = TIERS[activeTierIndex + 1] ?? null;

    const activeItems = activeTier.benefits
      .map(
        (benefit) =>
          `<li class="membership-benefits-widget__item membership-benefits-widget__item--active"><span>${benefit}</span></li>`
      )
      .join("");

    const nextItems = (nextTier?.benefits ?? [])
      .filter((benefit) => !activeTier.benefits.includes(benefit))
      .map(
        (benefit) =>
          `<li class="membership-benefits-widget__item membership-benefits-widget__item--next"><span>${benefit}</span></li>`
      )
      .join("");

    const activeItemsSection = `
      <div class="membership-benefits-widget__level">
        <span class="membership-benefits-widget__emoji">🎉</span><br>
        Membership Benefits with my $${this._amount.amount} Gift
      </div>
      <ul class="membership-benefits-widget__list membership-benefits-widget__list--active">${activeItems}</ul>
    `;

    const nextItemsSection = nextTier
      ? `
      <div class="membership-benefits-widget__divider"></div>
      <div class="membership-benefits-widget__level">
        A $${nextTier.amount} Gift Would Unlock...
      </div>
      <ul class="membership-benefits-widget__list membership-benefits-widget__list--next">${nextItems}</ul>
      <button type="button" class="membership-benefits-widget__button" data-engrid-next-tier-amount="${nextTier.amount}">
        Give $${nextTier.amount} to unlock these benefits
      </button>
    `
      : "";

    return `${activeItemsSection}${nextItemsSection}`;
  }

  private hide() {
    if (!this.container) return;
    this.container.classList.add("membership-benefits-widget--hidden");
  }
}

