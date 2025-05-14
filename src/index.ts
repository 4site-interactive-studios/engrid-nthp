import { Options, App, DonationFrequency } from "@4site/engrid-scripts"; // Uses ENGrid via NPM
// import { Options, App } from "../../engrid/packages/scripts"; // Uses ENGrid via Visual Studio Workspace

import "./sass/main.scss";
import { customScript } from "./scripts/main";
import { MembershipBenefitsModal } from "./scripts/membership-benefits-modal";

const options: Options = {
  applePay: false,
  CapitalizeFields: true,
  ClickToExpand: true,
  CurrencySymbol: "$",
  DecimalSeparator: ".",
  ThousandsSeparator: ",",
  MediaAttribution: true,
  SkipToMainContentLink: true,
  SrcDefer: true,
  ProgressBar: true,
  Placeholders: {
    ".en__field--donationAmt.en__field--withOther .en__field__input--other":
      "Enter an amount",
  },
  Debug: App.getUrlParameter("debug") == "true" ? true : false,
  MinAmount: 5,
  MaxAmount: 25000,
  MinAmountMessage: "Minimum gift amount is $5",
  MaxAmountMessage: "Maximum gift amount is $25,000",
  VGS: {
    "transaction.ccnumber": {
      css: {
        "@font-face": {
          "font-family": "Gibson",
          "font-style": "normal",
          "font-weight": "400",
          "font-display": "swap",
          src: `url("https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10028/gibson-light-webfont.woff2") format("woff2"), url("https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10028/gibson-light-webfont.woff") format("woff")`,
          "unicode-range":
            "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
        },
      },
    },
    "transaction.ccvv": {
      css: {
        "@font-face": {
          "font-family": "Gibson",
          "font-style": "normal",
          "font-weight": "400",
          "font-display": "swap",
          src: `url("https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10028/gibson-light-webfont.woff2") format("woff2"), url("https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10028/gibson-light-webfont.woff") format("woff")`,
          "unicode-range":
            "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
        },
      },
    },
  },
  onLoad: () => {
    new MembershipBenefitsModal();
    customScript(App, DonationFrequency);
  },
  onResize: () => console.log("Starter Theme Window Resized"),
};
new App(options);
