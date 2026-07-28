type TierDefinition = {
  amounts: Record<string, number>;
  primaryBenefits: string[];
  extraBenefits: string[];
};

export const TIERS: TierDefinition[] = [
  {
    amounts: { onetime: 30 },
    primaryBenefits: [
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
    ],
    extraBenefits: [
      "Annual subscription to Preservation magazine",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Weekly e-newsletter",
    ],
  },
  {
    amounts: { onetime: 50, monthly: 5.0 },
    primaryBenefits: [
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "2 Free Guest Passes to National Trust sites",
    ],
    extraBenefits: [
      "Annual subscription to Preservation magazine",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Weekly e-newsletter",
    ],
  },
  {
    amounts: { onetime: 100, monthly: 8.33 },
    primaryBenefits: [
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "2 Free Guest Passes to National Trust sites",
      "2 Gift Memberships",
    ],
    extraBenefits: [
      "Annual subscription to Preservation magazine",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Weekly e-newsletter",
    ],
  },
  {
    amounts: { onetime: 250, monthly: 20.83 },
    primaryBenefits: [
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "2 Free Guest Passes to National Trust sites",
      "2 Gift Memberships",
    ],
    extraBenefits: [
      "Annual subscription to Preservation magazine",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Weekly e-newsletter",
      "Personal invitations to special webinars with National Trust leadership",
    ],
  },
  {
    amounts: { onetime: 500, monthly: 41.66 },
    primaryBenefits: [
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "Personal invitations to special webinars with National Trust leadership",
      "Recognition in the Annual Report",
      "FREE canvas tote bag",
    ],
    extraBenefits: [
      "Annual subscription to Preservation magazine",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Weekly e-newsletter",
      "2 Free Guest Passes to National Trust sites",
      "3 Gift Memberships",
    ],
  },
  {
    amounts: { onetime: 1000, monthly: 83.33 },
    primaryBenefits: [
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "4 Free Guest Passes to National Trust sites",
      "Personal invitations to special webinars with National Trust leadership",
      "Recognition in the Annual Report",
    ],
    extraBenefits: [
      "Annual subscription to Preservation magazine",
      "Weekly e-newsletter",
      "4 Gift Memberships",
      "FREE canvas tote bag",
    ],
  },
  {
    amounts: { onetime: 5000, monthly: 416.66 },
    primaryBenefits: [
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "4 Free Guest Passes to National Trust sites",
      "6 Gift Memberships",
      "Personal invitations to special webinars with National Trust leadership",
      "Recognition in the Annual Report",
    ],
    extraBenefits: [
      "Annual subscription to Preservation magazine",
      "Weekly e-newsletter",
      "FREE canvas tote bag",
      "Complimentary copy of Why Old Places Matter by Thompson M. Mayes",
    ],
  },
  {
    amounts: { onetime: 10000, monthly: 833.33 },
    primaryBenefits: [
      "Discounted admission to National Trust sites & Distinctive Destinations",
      "30% off best available rate at Historic Hotels of America (online booking)",
      "Discounted admission to 500+ international historic sites",
      "Exclusive access to National Trust Tours",
      "4 Free Guest Passes to National Trust sites",
      "6 Gift Memberships",
      "Personal invitations to special webinars with National Trust leadership",
      "Recognition in the Annual Report",
      "Exclusive access to the National Trust Council Travel Program",
    ],
    extraBenefits: [
      "Annual subscription to Preservation magazine",
      "Weekly e-newsletter",
      "FREE canvas tote bag",
      "Complimentary copy of Why Old Places Matter by Thompson M. Mayes",
    ],
  },
];
