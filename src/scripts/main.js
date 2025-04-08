const tippy = require("tippy.js").default;

export const customScript = function (App) {
  console.log("ENGrid client scripts are executing");

  const dataLayer = window.dataLayer || [];

  // Add data-thank-you attribute to body of final page
  if (
    pageJson &&
    pageJson.pageNumber === pageJson.pageCount &&
    pageJson.pageCount > 1
  ) {
    App.setBodyData("thank-you", "true");

    // Client Custom Code for Google Analytics START
    if (parseFloat(pageJson.amount) > 0) {
      const donationAmt = parseFloat(pageJson.amount);
      const donationFrequency = pageJson.recurring ? "monthly" : "one-time";
      const transactionId = pageJson.transactionId || "";

      /**
       * Get the items array
       *
       * Array contains a single item object.
       *
       * @returns array
       */
      const getEcommerceItems = () => {
        return [
          {
            item_id: pageJson.campaignPageId,
            item_name: pageJson.pageType,
            affiliation: pageJson.campaignId,
            item_category: "Engaging Networks",
            item_category2: `Page Number: ${pageJson.pageNumber}`,
            item_category3: `Page Count: ${pageJson.pageCount}`,
            item_category4: "Name: ${page~name}",
            item_variant: donationFrequency,
            price: donationAmt,
            quantity: 1,
          },
        ];
      };
      /**
       * Wrapper function for dataLayer push
       *
       * Includes the null push to clear out any hanging data, as per Google docs.
       *
       * @param event string The name of the GA4 event to pass
       */
      const dataLayerEcommercePush = (event) => {
        // Clear any previously set ecommerce data
        dataLayer.push({ ecommerce: null });

        const ecommerce = {
          currency: "USD",
          value: donationAmt,
          items: getEcommerceItems(),
        };

        // If a page with a transaction ID, include that now
        if (transactionId !== "") {
          ecommerce.transaction_id = transactionId;
        }

        // Push data
        dataLayer.push({
          event: event,
          ecommerce: ecommerce,
        });
      };

      dataLayerEcommercePush("purchase");
    }

    // Client Custom Code for Google Analytics END
  } else {
    App.setBodyData("thank-you", "false");

    // Client Custom Code for Google Analytics START

    /**
     * Send an event about form_start when the form is first touched
     */
    let formTouched = false;

    document.querySelectorAll("input,select,textarea").forEach((el) => {
      el.addEventListener("focus", (event) => {
        // First time form input is touched
        if (!formTouched) {
          formTouched = true;
          dataLayer.push({ event: "form_start" });
        } //end if
      });
    });

    /**
     * After form is submitted, check if errors and report back
     */
    const queryParameters = new Proxy(
      new URLSearchParams(window.location.search),
      {
        get: (searchParams, prop) => searchParams.get(prop),
      }
    );

    // NOTE: "val" query param is passed when form is submitted. So if errors exist and val param exists, form was
    // attempted submit but unsuccessful.
    if (
      null !== queryParameters.val &&
      document.querySelectorAll(".en__errorList li").length > 0
    ) {
      dataLayer.push({ event: "errors" });
    }

    // Client Custom Code for Google Analytics END
  }

  // Move recurring arrow to under the recurring frequency question
  const recurringArrow = document.querySelector(".recurring-arrow");
  const recurringFreqQuestion = document.querySelector(
    ".en__field--recurrfreq"
  );
  if (recurringArrow && recurringFreqQuestion) {
    recurringFreqQuestion.insertAdjacentElement("afterend", recurringArrow);
  }

  // Show recurring text in receipt if recurring donation
  if (pageJson.recurring) {
    const recurringTextSpan = document.getElementById("recurring-yes");
    if (recurringTextSpan) {
      recurringTextSpan.style.display = "inline";
    }
  }

  const feeCoverCheck = App.getField("transaction.feeCover");
  const otherAmount3 = App.getField("transaction.othamt3");
  // If fee cover is checked, other amount 3 gets a Y
  if (feeCoverCheck && otherAmount3) {
    feeCoverCheck.addEventListener("change", function () {
      if (feeCoverCheck.checked) {
        otherAmount3.value = "Y";
      } else {
        otherAmount3.value = "";
      }
    });
  }

  App.setBodyData("client-js-loading", "finished");
};
