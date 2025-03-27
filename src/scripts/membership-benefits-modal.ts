import { Modal } from "@4site/engrid-scripts";

export class MembershipBenefitsModal extends Modal {
  constructor() {
    super({
      onClickOutside: "close",
      addCloseButton: false,
      closeButtonLabel: "",
    });

    document.querySelector(".modal-button button")?.addEventListener("click", () => {
      this.open();
    });
  }

  getModalContent() {
    const modalContent = document.querySelector(".membership-benefits-modal-content") as HTMLElement;
    return modalContent || "";
  }
}
