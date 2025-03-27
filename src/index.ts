import {
  Options,
  App
} from "@4site/engrid-scripts"; // Uses ENGrid via NPM
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
    ".en__field--donationAmt.en__field--withOther .en__field__input--other": "Enter an amount",
 },
  Debug: App.getUrlParameter("debug") == "true" ? true : false,
  MinAmount: 5,
  MaxAmount: 25000,
  MinAmountMessage: "Minimum gift amount is $5",
  MaxAmountMessage: "Maximum gift amount is $25,000",
  onLoad: () => {
    new MembershipBenefitsModal();
    customScript(App)
  },
  onResize: () => console.log("Starter Theme Window Resized"),
};
new App(options);
