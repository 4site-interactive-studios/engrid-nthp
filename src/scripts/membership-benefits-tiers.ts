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
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "Discounted Admission to 500+ International Historic Sites",
      "Exclusive Access to National Trust Tours",
      "2 Free Guest Passes to National Trust Sites",
    ],
    extraBenefits: [
      "Annual Subscription to Preservation Magazine",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Weekly e-Newsletter",
    ],
  },
  {
    amounts: { onetime: 100, monthly: 8.33 },
    primaryBenefits: [
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "Discounted Admission to 500+ International Historic Sites",
      "Exclusive Access to National Trust Tours",
      "2 Free Guest Passes to National Trust Sites",
      "2 Gift Memberships",
    ],
    extraBenefits: [
      "Annual Subscription to Preservation Magazine",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Weekly e-Newsletter",
    ],
  },
  {
    amounts: { onetime: 250, monthly: 20.83 },
    primaryBenefits: [
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "Discounted Admission to 500+ International Historic Sites",
      "Exclusive Access to National Trust Tours",
      "2 Free Guest Passes to National Trust Sites",
      "2 Gift Memberships",
    ],
    extraBenefits: [
      "Annual Subscription to Preservation Magazine",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Weekly e-Newsletter",
      "Personal Invitations to Special Webinars with National Trust Leadership",
    ],
  },
  {
    amounts: { onetime: 500, monthly: 41.66 },
    primaryBenefits: [
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "Discounted Admission to 500+ International Historic Sites",
      "Exclusive Access to National Trust Tours",
      "Personal Invitations to Special Webinars with National Trust Leadership",
      "Recognition in the Annual Report",
      "FREE Luggage Tag",
    ],
    extraBenefits: [
      "Annual Subscription to Preservation Magazine",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Weekly e-Newsletter",
      "2 Free Guest Passes to National Trust Sites",
      "3 Gift Memberships",
    ],
  },
  {
    amounts: { onetime: 1000, monthly: 83.33 },
    primaryBenefits: [
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Discounted Admission to 500+ International Historic Sites",
      "Exclusive Access to National Trust Tours",
      "4 Free Guest Passes to National Trust Sites",
      "Personal Invitations to Special Webinars with National Trust Leadership",
      "Recognition in the Annual Report",
    ],
    extraBenefits: [
      "Annual Subscription to Preservation Magazine",
      "Weekly e-Newsletter",
      "4 Gift Memberships",
      "FREE Luggage Tag",
    ],
  },
  {
    amounts: { onetime: 5000, monthly: 416.66 },
    primaryBenefits: [
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Discounted Admission to 500+ International Historic Sites",
      "Exclusive Access to National Trust Tours",
      "4 Free Guest Passes to National Trust Sites",
      "6 Gift Memberships",
      "Personal Invitations to Special Webinars with National Trust Leadership",
      "Recognition in the Annual Report",
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
      "Discounted Admission to National Trust Sites & Distinctive Destinations",
      "30% off Best Available Rate at Historic Hotels of America (Online Booking)",
      "Discounted Admission to 500+ International Historic Sites",
      "Exclusive Access to National Trust Tours",
      "4 Free Guest Passes to National Trust Sites",
      "6 Gift Memberships",
      "Personal Invitations to Special Webinars with National Trust Leadership",
      "Recognition in the Annual Report",
      "Exclusive Access to the National Trust Council Travel Program",
    ],
    extraBenefits: [
      "Annual Subscription to Preservation Magazine",
      "Weekly e-Newsletter",
      "FREE Luggage Tag",
      "Complimentary Copy of Why Old Places Matter by Thompson M. Mayes",
    ],
  },
];
