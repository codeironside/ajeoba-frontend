import * as Yup from "yup";

export const DetailCorporateBuyer = (orgVerificationText) =>
  Yup.object().shape({
    corporateBuyerDetailPassportPhoto: Yup.string()
      .required("Passport photo is required")
      .nullable(),

    corporateBuyerDetailName: Yup.string()
      .required("Corporate buyer name is required")
      .min(2, "Corporate buyer name should have minimum 2 characters")
      .max(100, "Corporate buyer name can have maximum 100 characters"),

    corporateBuyerDetailRegNumber: Yup.string()
      .nullable()
      .required("Corporate buyer registration number is required")
      .min(
        2,
        "Corporate buyer registration number should have minimum 2 characters"
      )
      .max(
        50,
        "Corporate buyer registration number can have maximum 50 characters"
      ),

    orgVerificationNumber: Yup.string()
      .nullable()
      .required(`${orgVerificationText} number is required`)
      .min(2, `${orgVerificationText} number should have minimum 2 chars`)
      .max(50, `${orgVerificationText} number can have maximum 50 chars`),

    corporateBuyerDetailCACDocument: Yup.string()
      .required("CAC document is required")
      .nullable(),
  });
