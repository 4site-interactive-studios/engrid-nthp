import {
  DonationAmount,
  DonationFrequency,
  Modal,
} from "@4site/engrid-scripts";
import { TIERS } from "./membership-benefits-tiers";

type TierConfig = {
  amount: number;
  primaryBenefits: string[];
  extraBenefits: string[];
};

class TierBenefitsModal extends Modal {
  private static readonly titleId = "membership-tier-benefits-modal-title";
  private trigger: HTMLElement | null = null;

  constructor() {
    super({
      onClickOutside: "close",
      addCloseButton: false,
      closeButtonLabel: "",
      customClass: "membership-tier-benefits-modal",
    });

    this.handleKeydown = this.handleKeydown.bind(this);
    this.modal?.setAttribute("aria-labelledby", TierBenefitsModal.titleId);
    this.modal?.addEventListener("keydown", this.handleKeydown);
  }

  private handleKeydown(event: KeyboardEvent) {
    const closeButton =
      event.target instanceof Element
        ? event.target.closest(".engrid-modal__close-x")
        : null;
    const isCloseButtonKey =
      closeButton !== null && (event.key === "Enter" || event.key === " ");

    if (event.key === "Escape" || isCloseButtonKey) {
      event.preventDefault();
      this.close();
    }
  }

  getModalContent() {
    return `
      <div class="membership-tier-benefits-modal__content">
        <h2 id="${TierBenefitsModal.titleId}"></h2>
        <ul class="membership-tier-benefits-modal__list"></ul>
      </div>
    `;
  }

  openForTier(title: string, benefits: string[]) {
    const heading = this.modal?.querySelector(`#${TierBenefitsModal.titleId}`);
    const list = this.modal?.querySelector(
      ".membership-tier-benefits-modal__list"
    );
    if (!heading || !list) return;

    heading.textContent = title;
    list.innerHTML = "";
    for (const benefit of benefits) {
      const item = document.createElement("li");
      item.textContent = benefit;
      list.appendChild(item);
    }

    this.trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    this.open();
  }

  close() {
    super.close();
    this.trigger?.focus();
    this.trigger = null;
  }
}

export class MembershipBenefitsWidget {
  private readonly container: HTMLElement | null;
  private readonly tierMap: Map<string, TierConfig[]>;
  private readonly benefitsModal: TierBenefitsModal | null;
  private readonly _amount = DonationAmount.getInstance();
  private readonly _frequency = DonationFrequency.getInstance();

  constructor(selector = ".membership-benefits-widget") {
    this.container = document.querySelector(selector) as HTMLElement | null;
    this.tierMap = this.buildTierMap();
    this.benefitsModal = this.container ? new TierBenefitsModal() : null;
    this.handleWidgetClick = this.handleWidgetClick.bind(this);
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
      const configs = TIERS.filter((tier) => freq in tier.amounts)
        .map((tier) => ({
          amount: tier.amounts[freq],
          primaryBenefits: tier.primaryBenefits,
          extraBenefits: tier.extraBenefits,
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

    // Delegate clicks because the widget content is replaced on every update.
    this.container?.addEventListener("click", this.handleWidgetClick);
  }

  private handleWidgetClick(event: Event) {
    if (!(event.target instanceof Element)) return;

    const nextTierButton = event.target.closest(
      "[data-engrid-next-tier-amount]"
    );
    const nextTierAmount = nextTierButton?.getAttribute(
      "data-engrid-next-tier-amount"
    );
    if (nextTierAmount) {
      this._amount.setAmount(Number(nextTierAmount));
      return;
    }

    const moreBenefitsButton = event.target.closest(
      "[data-engrid-benefits-tier-amount]"
    );
    if (!moreBenefitsButton) return;

    const benefitsTierAmount = Number(
      moreBenefitsButton.getAttribute("data-engrid-benefits-tier-amount")
    );
    if (Number.isFinite(benefitsTierAmount)) {
      this.openBenefitsModal(benefitsTierAmount);
    }
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

  private getActiveTierAmount(
    amountValue: number,
    tiers: TierConfig[]
  ): number {
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

  private getAllBenefits(tier: TierConfig): string[] {
    return [...tier.primaryBenefits, ...tier.extraBenefits];
  }

  private openBenefitsModal(tierAmount: number) {
    const freq = this._frequency.frequency;
    const tier = this.getTiersForFrequency(freq)?.find(
      ({ amount }) => amount === tierAmount
    );
    if (!tier || !this.benefitsModal) return;

    const frequencyLabel = freq.toLowerCase() === "monthly" ? "/mo" : "";
    this.benefitsModal.openForTier(
      `All Membership Benefits with my $${this._amount.amount}${frequencyLabel} Gift`,
      this.getAllBenefits(tier)
    );
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
    const activeEnd = activeListNew?.offsetHeight ?? 0;
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

    const activeItems = activeTier.primaryBenefits
      .map(
        (benefit) =>
          `<li class="membership-benefits-widget__item membership-benefits-widget__item--active"><span>${benefit}</span></li>`
      )
      .join("");

    const moreBenefitsItem = activeTier.extraBenefits.length
      ? `
        <li class="membership-benefits-widget__more">
          <button type="button" class="membership-benefits-widget__more-button" data-engrid-benefits-tier-amount="${activeTier.amount}" aria-haspopup="dialog">
            ... and more!
          </button>
        </li>
      `
      : "";

    const activeBenefits = this.getAllBenefits(activeTier);
    const nextItems = (nextTier ? this.getAllBenefits(nextTier) : [])
      .filter((benefit) => !activeBenefits.includes(benefit))
      .map(
        (benefit) =>
          `<li class="membership-benefits-widget__item membership-benefits-widget__item--next"><span>${benefit}</span></li>`
      )
      .join("");

    const frequencyLabel = freq.toLowerCase() === "monthly" ? "/mo" : "";

    const activeItemsSection = `
      <div class="membership-benefits-widget__level">
        <span class="membership-benefits-widget__emoji"></span>
        Membership Benefits with my $${this._amount.amount}<span class="mb__frequency-label">${frequencyLabel}</span> Gift
      </div>
      <ul class="membership-benefits-widget__list membership-benefits-widget__list--active">${activeItems}${moreBenefitsItem}</ul>
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
