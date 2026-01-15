export const validationRequirements = [
  {
    id: "/",
    fields: [
      { name: "first_name" },
      { name: "last_name" },
      {
        name: "business_name",
      },

      { name: "email", format: "email" },
    ],
  },
  {
    id: "/page2",
    fields: [
      { name: "payment_mode" },
      { name: "accept_preauth_terms_and_conditions" },
    ],
  },
  {
    id: "/page3",
    fields: [
      {
        conditional: "payment_mode",
        value: "provide_banking_information",
        id: "branch_transit_number",
        format: "length",
        length: 5,
      },
      {
        conditional: "payment_mode",
        value: "provide_banking_information",
        id: "bank_account_number",
        format: "length",
        length: 7,
      },
      {
        conditional: "payment_mode",
        value: "provide_banking_information",
        id: "financial_institution_number",
        format: "length",
        length: 3,
      },
      {
        conditional: "payment_mode",
        value: "provide_void_cheque",
        id: "void_cheque_image",
      },
    ],
  },
  { id: "/page4", fields: [{ name: "accept_terms_and_conditions" }] },
  {
    id: "/page5",
    fields: [
      { name: "verify_entered_information" },
      { name: "signature_image" },
    ],
  },
  { id: "/page6", fields: [] },
];
