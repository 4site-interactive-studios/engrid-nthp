import { ENGrid } from "@4site/engrid-scripts";

export function premiumGiftCheckbox() {
  if (ENGrid.getBodyData("theme") !== "nthp2") return;

  const block = document.querySelector<HTMLElement>(
    ".en__component--premiumgiftblock"
  );
  if (!block) return;

  const initialize = () => {
    const radios = block.querySelectorAll<HTMLInputElement>(
      ".en__pg__select input[type='radio']"
    );

    // only swap when it's exactly 1 gift + the "no gift" option (value "0"),
    // not e.g. 2 actual premiums
    if (radios.length !== 2 || radios[1].value !== "0") {
      return;
    }

    const [giftRadio, noGiftRadio] = radios;

    // EN re-renders the premium list (e.g. on amount/frequency change);
    // skip renders we've already swapped
    if (giftRadio.nextElementSibling?.id === "engrid-premium-gift-checkbox") {
      return;
    }

    // The checkbox replaces the "maximize my donation" no-gift option, so hide
    // it here rather than in CSS — it must stay visible when there are more
    // than 2 premium options and the swap doesn't happen
    const noGiftOption = noGiftRadio.closest<HTMLElement>(".en__pg");
    if (noGiftOption) {
      noGiftOption.style.display = "none";
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "engrid-premium-gift-checkbox";
    checkbox.checked = giftRadio.checked;

    // the theme's standard checkbox styling (input + label:before) paints the
    // visual, so the label needs an explicit association for clicks to toggle
    const label = document.createElement("label");
    label.htmlFor = checkbox.id;

    const giftName = giftRadio
      .closest(".en__pg")
      ?.querySelector(".en__pg__name")
      ?.textContent?.trim();
    if (giftName) {
      checkbox.setAttribute("aria-label", giftName);
    }

    radios.forEach((radio) => {
      radio.style.display = "none";
    });

    giftRadio.after(checkbox, label);

    // PremiumGift force-checks the row's radio when a clicked element has no
    // "type" property (e.g. this label) — hide label clicks from its delegated
    // document listener so unchecking the checkbox sticks
    label.addEventListener("click", (event) => event.stopPropagation());

    // sync the checkbox when the gift is (de)selected without it, e.g. by
    // clicking the premium title/description
    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        checkbox.checked = giftRadio.checked;
      });
    });

    if (!block.querySelector(".engrid-premium-gift-skip-note")) {
      const skipNote = document.createElement("p");
      skipNote.className = "engrid-premium-gift-skip-note";
      skipNote.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg><span>Skip the gift and every dollar goes to protecting historic places.</span>';
      block.querySelector(".en__pgList")?.after(skipNote);
    }

    checkbox.addEventListener("change", () => {
      // a real click fires the click + change handlers EN/engrid bind to
      (checkbox.checked ? giftRadio : noGiftRadio).click();
    });
  };

  // stays connected so the swap is re-applied whenever EN re-renders the list
  const observer = new MutationObserver(initialize);

  observer.observe(block, {
    childList: true,
    subtree: true,
  });

  initialize();
}
