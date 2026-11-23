type TierDefinition = {
  amounts: Record<string, number>;
  primaryBenefits: string[];
  extraBenefits: string[];
  upsellBenefits: string[];
  upsellAmount: number | null;
};

export const TIERS: TierDefinition[] = [
  // One-time memberships
  // Below the first membership tier, show only the upsell.
  {
    amounts: { onetime: 5 },
    primaryBenefits: [],
    extraBenefits: [],
    upsellBenefits: [
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "Discounted Admission to 500+ International Historic Sites",
      "Exclusive Access to National Trust Tours",
    ],
    upsellAmount: 30,
  },
  {
    amounts: { onetime: 30 },
    primaryBenefits: [
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "Discounted Admission to 500+ International Historic Sites",
      "Exclusive Access to National Trust Tours",
    ],
    extraBenefits: [
      "Annual Subscription to <em>Preservation</em> Magazine",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Weekly e-Newsletter",
      "FREE Luggage Tag",
    ],
    upsellBenefits: [
      "Discounted Admission to Historic Sites for 2 Adults and Children Under 18 in the Household.",
    ],
    upsellAmount: 50,
  },
  {
    amounts: { onetime: 50 },
    primaryBenefits: [
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Discounted Admission to 500+ International Historic Sites",
    ],
    extraBenefits: ["Weekly e-Newsletter", "FREE Luggage Tag"],
    upsellBenefits: ["2 Free Guest Passes to National Trust Sites"],
    upsellAmount: 100,
  },
  {
    amounts: { onetime: 100 },
    primaryBenefits: [
      "2 Free Guest Passes to National Trust Sites",
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Discounted Admission to 500+ International Historic Sites",
    ],
    extraBenefits: ["Weekly e-Newsletter", "FREE Luggage Tag"],
    upsellBenefits: ["2 Gift Memberships"],
    upsellAmount: 250,
  },
  {
    amounts: { onetime: 250 },
    primaryBenefits: [
      "2 Gift Memberships",
      "2 Free Guest Passes to National Trust Sites",
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
    ],
    extraBenefits: ["Weekly e-Newsletter", "FREE Luggage Tag"],
    upsellBenefits: [
      "3 Gift Memberships",
      "Invitations to Special Webinars with National Trust Leadership",
    ],
    upsellAmount: 500,
  },
  {
    amounts: { onetime: 500 },
    primaryBenefits: [
      "3 Gift Memberships",
      "Invitations to Special Webinars with National Trust Leadership",
      "2 Free Guest Passes to National Trust Sites",
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
    ],
    extraBenefits: [
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Weekly e-Newsletter",
      "FREE Luggage Tag",
    ],
    upsellBenefits: [
      "4 Gift Memberships",
      "4 Free Guest Passes to National Trust Sites",
      "Recognition in the Annual Report",
      "Personal Invitations to Special Webinars with National Trust Leadership",
      "Exclusive National Trust Canvas Tote Bag",
      "FREE Luggage Tag",
    ],
    upsellAmount: 1000,
  },
  {
    amounts: { onetime: 1000 },
    primaryBenefits: [
      "4 Gift Memberships",
      "4 Free Guest Passes to National Trust Sites",
      "Recognition in the Annual Report",
      "Personal Invitations to Special Webinars with National Trust Leadership",
      "Exclusive National Trust Canvas Tote Bag",
    ],
    extraBenefits: [
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Weekly e-Newsletter",
      "FREE Luggage Tag",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
    ],
    upsellBenefits: [
      "6 Gift Memberships",
      "Complimentary Copy of Why Old Places Matter by Thompson M. Mayes",
    ],
    upsellAmount: 5000,
  },
  {
    amounts: { onetime: 5000 },
    primaryBenefits: [
      "6 Gift Memberships",
      "4 Free Guest Passes to National Trust Sites",
      "Recognition in the Annual Report",
      "Personal Invitations to Special Webinars with National Trust Leadership",
      "Exclusive National Trust Canvas Tote Bag",
    ],
    extraBenefits: [
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Weekly e-Newsletter",
      "FREE Luggage Tag",
      "Complimentary Copy of Why Old Places Matter by Thompson M. Mayes",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
    ],
    upsellBenefits: [
      "Exclusive Access to the National Trust Council Travel Program",
      "Opportunities to Attend Special Events such as Behind-the-Scenes Tours and Other Invitation-Only Gatherings",
      "Access to Webinars, Presentations, and Virtual Gatherings with Executives, Experts, and Senior Leaders from the National Trust",
      "Insider Updates from National Trust Leadership on the Latest Programs and Strategic Priorities",
    ],
    upsellAmount: 10000,
  },
  {
    amounts: { onetime: 10000 },
    primaryBenefits: [
      "Exclusive Access to the National Trust Council Travel Program",
      "6 Gift Memberships",
      "4 Free Guest Passes to National Trust Sites",
      "Recognition in the Annual Report",
      "Personal Invitations to Special Webinars with National Trust Leadership",
    ],
    extraBenefits: [
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Weekly e-Newsletter",
      "FREE Luggage Tag",
      "Complimentary Copy of Why Old Places Matter by Thompson M. Mayes",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
    ],
    upsellBenefits: [],
    upsellAmount: null,
  },

  // Monthly memberships
  {
    amounts: { monthly: 5.0 },
    primaryBenefits: [
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Discounted Admission to 500+ International Historic Sites",
    ],
    extraBenefits: [
      "Weekly e-Newsletter",
      "Invitations to Special Webinars with National Trust Leadership",
      "FREE Luggage Tag",
    ],
    upsellBenefits: [
      "2 Free Guest Passes to National Trust Sites",
      "Invitations to Special Webinars with National Trust Leadership",
    ],
    upsellAmount: 18,
  },
  {
    amounts: { monthly: 8.33 },
    primaryBenefits: [
      "2 Free Guest Passes to National Trust Sites",
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Discounted Admission to 500+ International Historic Sites",
    ],
    extraBenefits: [
      "Weekly e-Newsletter",
      "Invitations to Special Webinars with National Trust Leadership",
      "FREE Luggage Tag",
    ],
    upsellBenefits: ["2 Gift Memberships"],
    upsellAmount: 25,
  },
  {
    amounts: { monthly: 20.83 },
    primaryBenefits: [
      "2 Gift Memberships",
      "2 Free Guest Passes to National Trust Sites",
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
    ],
    extraBenefits: [
      "Weekly e-Newsletter",
      "Invitations to Special Webinars with National Trust Leadership",
      "FREE Luggage Tag",
    ],
    upsellBenefits: ["3 Gift Memberships"],
    upsellAmount: 41.66,
  },
  {
    amounts: { monthly: 41.66 },
    primaryBenefits: [
      "3 Gift Memberships",
      "Invitations to Special Webinars with National Trust Leadership",
      "2 Free Guest Passes to National Trust Sites",
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
    ],
    extraBenefits: [
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Weekly e-Newsletter",
      "FREE Luggage Tag",
    ],
    upsellBenefits: [
      "4 Gift Memberships",
      "4 Free Guest Passes to National Trust Sites",
      "Recognition in the Annual Report",
      "Personal Invitations to Special Webinars with National Trust Leadership",
      "Exclusive National Trust Canvas Tote Bag",
      "FREE Luggage Tag",
    ],
    upsellAmount: 83.33,
  },
  {
    amounts: { monthly: 83.33 },
    primaryBenefits: [
      "4 Gift Memberships",
      "4 Free Guest Passes to National Trust Sites",
      "Recognition in the Annual Report",
      "Personal Invitations to Special Webinars with National Trust Leadership",
      "Exclusive National Trust Canvas Tote Bag",
    ],
    extraBenefits: [
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Weekly e-Newsletter",
      "FREE Luggage Tag",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
    ],
    upsellBenefits: [
      "6 Gift Memberships",
      "Complimentary Copy of Why Old Places Matter by Thompson M. Mayes",
    ],
    upsellAmount: 416.66,
  },
  {
    amounts: { monthly: 416.66 },
    primaryBenefits: [
      "6 Gift Memberships",
      "4 Free Guest Passes to National Trust Sites",
      "Recognition in the Annual Report",
      "Personal Invitations to Special Webinars with National Trust Leadership",
      "Exclusive National Trust Canvas Tote Bag",
    ],
    extraBenefits: [
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Weekly e-Newsletter",
      "FREE Luggage Tag",
      "Complimentary Copy of Why Old Places Matter by Thompson M. Mayes",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
    ],
    upsellBenefits: [
      "Exclusive Access to the National Trust Council Travel Program",
      "Opportunities to Attend Special Events Such as Behind-the-Scenes Tours and Other Invitation-Only Gatherings",
      "Access to Webinars, Presentations, and Virtual Gatherings with Executives, Experts, and Senior Leaders from the National Trust",
      "Insider Updates from National Trust Leadership on the Latest Programs and Strategic Priorities",
    ],
    upsellAmount: 833.33,
  },
  {
    amounts: { monthly: 833.33 },
    primaryBenefits: [
      "Exclusive Access to the National Trust Council Travel Program",
      "6 Gift Memberships",
      "4 Free Guest Passes to National Trust Sites",
      "Recognition in the Annual Report",
      "Personal Invitations to Special Webinars with National Trust Leadership",
    ],
    extraBenefits: [
      "Annual Subscription to <em>Preservation</em> Magazine",
      "Weekly e-Newsletter",
      "FREE Luggage Tag",
      "Complimentary Copy of Why Old Places Matter by Thompson M. Mayes",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Opportunities to Attend Special Events Such as Behind-the-Scenes Tours and Other Invitation-Only Gatherings",
      "Insider Updates from National Trust Leadership on the Latest Programs and Strategic Priorities",
    ],
    upsellBenefits: [],
    upsellAmount: null,
  },
];
