import * as Yup from "yup";

export const singleSellerDetailsSchema = Yup.object().shape({
  taxOption: Yup.string(),
  countryOfBirth: Yup.string().required("Country of birth is required"),
  citizenship: Yup.string().required("Citizenship is required"),
  countryOfTax: Yup.string().required("country of Tax is required"),
  uniqueIdentifictionType: Yup.string().required(
    "Unique Identifiation Type is required "
  ),
  uniqueIdentificationNumber: Yup.string()
    .required("Unique Identifiction number is required")
    .min(2, "Unique Identifiction number should have minimum 2 chars")
    .max(50, "Unique Identifiction number can have maximum 50 chars"),
  taxId: Yup.string().when("taxOption", {
    is: "yes",
    then: Yup.string().required("Tax id is required").nullable(),
  }),
  typeOfProducts: Yup.array()
    .required("Type of product is required")
    .min(1, "At least 1 product is rquired"),
});
