const tippy = require("tippy.js").default;

export const customScript = function (App) {
  console.log("ENGrid client scripts are executing");

  // Add data-thank-you attribute to body of final page
  if (
    pageJson &&
    pageJson.pageNumber === pageJson.pageCount &&
    pageJson.pageCount > 1
  ) {
    App.setBodyData("thank-you", "true");
  } else {
    App.setBodyData("thank-you", "false");
  }

  // Move recurring arrow to under the recurring frequency question
  const recurringArrow = document.querySelector(".recurring-arrow");
  const recurringFreqQuestion = document.querySelector(".en__field--recurrfreq");
  if (recurringArrow && recurringFreqQuestion) {
    recurringFreqQuestion.insertAdjacentElement("afterend", recurringArrow);
  }

  // Show recurring text in receipt if recurring donation
  if (pageJson.recurring) {
    const recurringTextSpan = document.getElementById('recurring-yes');
    if (recurringTextSpan) {
      recurringTextSpan.style.display = 'inline';
    }
  }

  App.setBodyData("client-js-loading", "finished");
};
