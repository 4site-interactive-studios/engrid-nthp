import { DonationAmount, DonationFrequency } from "@4site/engrid-scripts";

type TierConfig = {
  amount: number;
  benefits: string[];
};

type TierDefinition = {
  amounts: Record<string, number>;
  benefits: string[];
};

const TIERS: TierDefinition[] = [
  {
    amounts: { onetime: 30 },
    benefits: [
      "Annual subscription to Preservation magazine",
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "Weekly e-newsletter",
    ],
  },
  {
    amounts: { onetime: 50, monthly: 5.0 },
    benefits: [
      "Annual subscription to Preservation magazine",
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "Weekly e-newsletter",
      "2 Free Guest Passes to National Trust sites",
    ],
  },
  {
    amounts: { onetime: 100, monthly: 8.33 },
    benefits: [
      "Annual subscription to Preservation magazine",
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "Weekly e-newsletter",
      "2 Free Guest Passes to National Trust sites",
      "2 Gift Memberships",
    ],
  },
  {
    amounts: { onetime: 250, monthly: 20.83 },
    benefits: [
      "Annual subscription to Preservation magazine",
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "Weekly e-newsletter",
      "2 Free Guest Passes to National Trust sites",
      "2 Gift Memberships",
      "Personal invitations to special webinars with National Trust leadership",
    ],
  },
  {
    amounts: { onetime: 500, monthly: 41.66 },
    benefits: [
      "Annual subscription to Preservation magazine",
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "Weekly e-newsletter",
      "2 Free Guest Passes to National Trust sites",
      "3 Gift Memberships",
      "Personal invitations to special webinars with National Trust leadership",
      "Recognition in the Annual Report",
      "FREE canvas tote bag",
    ],
  },
  {
    amounts: { onetime: 1000, monthly: 83.33 },
    benefits: [
      "Annual subscription to Preservation magazine",
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "Weekly e-newsletter",
      "4 Free Guest Passes to National Trust sites",
      "4 Gift Memberships",
      "Personal invitations to special webinars with National Trust leadership",
      "Recognition in the Annual Report",
      "FREE canvas tote bag",
    ],
  },
  {
    amounts: { onetime: 5000, monthly: 416.66 },
    benefits: [
      "Annual subscription to Preservation magazine",
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "Weekly e-newsletter",
      "4 Free Guest Passes to National Trust sites",
      "6 Gift Memberships",
      "Personal invitations to special webinars with National Trust leadership",
      "Recognition in the Annual Report",
      "FREE canvas tote bag",
      "Complimentary copy of Why Old Places Matter by Thompson M. Mayes",
    ],
  },
  {
    amounts: { onetime: 10000, monthly: 833.33 },
    benefits: [
      "Annual subscription to Preservation magazine",
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "Weekly e-newsletter",
      "4 Free Guest Passes to National Trust sites",
      "6 Gift Memberships",
      "Personal invitations to special webinars with National Trust leadership",
      "Recognition in the Annual Report",
      "FREE canvas tote bag",
      "Complimentary copy of Why Old Places Matter by Thompson M. Mayes",
      "Exclusive access to the National Trust Council Travel Program",
    ],
  },
];

export class MembershipBenefitsWidget {
  private readonly container: HTMLElement | null;
  private readonly tierMap: Map<string, TierConfig[]>;
  private readonly _amount = DonationAmount.getInstance();
  private readonly _frequency = DonationFrequency.getInstance();

  constructor(selector = ".membership-benefits-widget") {
    this.container = document.querySelector(selector) as HTMLElement | null;
    this.tierMap = this.buildTierMap();
    if (!this.container) return;

    this.update();
    this.addListeners();
  }

  private buildTierMap(): Map<string, TierConfig[]> {
    const map = new Map<string, TierConfig[]>();
    const frequencies = new Set<string>();

    // Collect all frequency keys
    for (const tier of TIERS) {
      for (const freq of Object.keys(tier.amounts)) {
        frequencies.add(freq);
      }
    }

    // Build a sorted TierConfig[] for each frequency
    for (const freq of frequencies) {
      const configs = TIERS
        .filter((tier) => freq in tier.amounts)
        .map((tier) => ({
          amount: tier.amounts[freq],
          benefits: tier.benefits,
        }))
        .sort((a, b) => a.amount - b.amount);

      map.set(freq, configs);
    }

    return map;
  }

  private getTiersForFrequency(freq: string): TierConfig[] | undefined {
    return this.tierMap.get(freq.toLowerCase());
  }

  private addListeners() {
    this._amount.onAmountChange.subscribe(() => this.update());
    this._frequency.onFrequencyChange.subscribe(() => this.update());

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

  private update() {
    const freq = this._frequency.frequency;
    const tiers = this.getTiersForFrequency(freq);
    const amount = this._amount.amount;

    if (!tiers || !Number.isFinite(amount) || amount < tiers[0].amount) {
      this.hide();
      return;
    }

    this.render(this.getActiveTierAmount(amount, tiers));
  }

  private getActiveTierAmount(amountValue: number, tiers: TierConfig[]): number {
    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      return tiers[0].amount;
    }

    let resolvedTier = tiers[0].amount;
    for (const tier of tiers) {
      if (amountValue >= tier.amount) {
        resolvedTier = tier.amount;
      }
    }

    return resolvedTier;
  }

  private render(activeAmount: number) {
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

  private getWidgetContent(activeAmount: number): string {
    const freq = this._frequency.frequency;
    const tiers = this.getTiersForFrequency(freq);
    if (!tiers) return "";

    const activeTierIndex = tiers.findIndex(
      (tier) => tier.amount === activeAmount
    );
    const activeTier = tiers[activeTierIndex] ?? tiers[0];
    const nextTier = tiers[activeTierIndex + 1] ?? null;

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

    const frequencyLabel = freq.toLowerCase() === "monthly" ? "/mo" : "";

    const activeItemsSection = `
      <div class="membership-benefits-widget__level">
        <span class="membership-benefits-widget__emoji">🎉</span><br>
        Membership Benefits with my $${this._amount.amount}<span class="mb__frequency-label">${frequencyLabel}</span> Gift
      </div>
      <ul class="membership-benefits-widget__list membership-benefits-widget__list--active">${activeItems}</ul>
    `;

    const nextItemsSection = nextTier
      ? `
      <div class="membership-benefits-widget__divider"></div>
      <div class="membership-benefits-widget__level">
        A $${nextTier.amount}<span class="mb__frequency-label">${frequencyLabel}</span> Gift Would Unlock...
      </div>
      <ul class="membership-benefits-widget__list membership-benefits-widget__list--next">${nextItems}</ul>
      <button type="button" class="membership-benefits-widget__button" data-engrid-next-tier-amount="${nextTier.amount}">
        Give $${nextTier.amount}<span class="mb__frequency-label">${frequencyLabel}</span> to unlock these benefits
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
