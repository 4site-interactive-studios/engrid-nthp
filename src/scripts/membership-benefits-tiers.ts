type TierDefinition = {
  amounts: Record<string, number>;
  primaryBenefits: string[];
  extraBenefits: string[];
};

export const TIERS: TierDefinition[] = [
  {
    amounts: { onetime: 30 },
    primaryBenefits: [
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "Discounted Admission to 500+ International Historic Sites",
      "Exclusive Access to National Trust Tours",
    ],
    extraBenefits: [
      "Annual Subscription to Preservation Magazine",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Weekly e-Newsletter",
    ],
  },
  {
    amounts: { onetime: 50, monthly: 5.0 },
    primaryBenefits: [
      "Annual Subscription to Preservation Magazine",
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Discounted Admission to 500+ International Historic Sites",
    ],
    extraBenefits: ["Weekly e-Newsletter"],
  },
  {
    amounts: { onetime: 250, monthly: 18.0 },
    primaryBenefits: [
      "2 Gift Memberships",
      "2 Free Guest Passes to National Trust Sites",
      "Annual Subscription to Preservation Magazine",
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
    ],
    extraBenefits: [
      "Weekly e-Newsletter",
      "Personal Invitations to Special Webinars with National Trust Leadership",
    ],
  },
  {
    amounts: { onetime: 500, monthly: 41.66 },
    primaryBenefits: [
      "3 Gift Memberships",
      "Personal Invitations to Special Webinars with National Trust Leadership",
      "2 Free Guest Passes to National Trust Sites",
      "Annual Subscription to Preservation Magazine",
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
    ],
    extraBenefits: [
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Weekly e-Newsletter",
    ],
  },
  {
    amounts: { onetime: 1000, monthly: 83.33 },
    primaryBenefits: [
      "4 Gift Memberships",
      "4 Free Guest Passes to National Trust Sites",
      "Recognition in the Annual Report",
      "Personal Invitations to Special Webinars with National Trust Leadership",
      "Exclusive National Trust Canvas Tote Bag",
    ],
    extraBenefits: [
      "Annual Subscription to Preservation Magazine",
      "Weekly e-Newsletter",
      "FREE Luggage Tag",
    ],
  },
  {
    amounts: { onetime: 5000, monthly: 416.66 },
    primaryBenefits: [
      "6 Gift Memberships",
      "4 Free Guest Passes to National Trust Sites",
      "Recognition in the Annual Report",
      "Personal Invitations to Special Webinars with National Trust Leadership",
      "Exclusive National Trust Canvas Tote Bag",
    ],
    extraBenefits: [
      "Annual Subscription to Preservation Magazine",
      "Weekly e-Newsletter",
      "FREE Luggage Tag",
      "Complimentary Copy of Why Old Places Matter by Thompson M. Mayes",
    ],
  },
  {
    amounts: { onetime: 10000, monthly: 833.33 },
    primaryBenefits: [
      "Exclusive Access to the National Trust Council Travel Program",
      "6 Gift Memberships",
      "4 Free Guest Passes to National Trust Sites",
      "Recognition in the Annual Report",
      "Personal Invitations to Special Webinars with National Trust Leadership",
    ],
    extraBenefits: [
      "Annual Subscription to Preservation Magazine",
      "Weekly e-Newsletter",
      "FREE Luggage Tag",
      "Complimentary Copy of Why Old Places Matter by Thompson M. Mayes",
    ],
  },
];
