import * as Yup from "yup";

export const signUpQADetails = (orgVerificationText) =>
  Yup.object().shape({
    companyName: Yup.string()
      .required("Company name is required")
      .min(2, "Company name should have minimum 2 chars")
      .max(100, "Company name can have maximum 100 chars"),
    companyRegNumber: Yup.string()
      .required("Company registration number is required")
      .min(2, "Company registration number should have minimum 2 chars")
      .max(50, "Company registration number can have maximum 50 chars"),

    orgVerificationNumber: Yup.string()
      .required(`${orgVerificationText} number is required`)
      .min(2, `${orgVerificationText} number should have minimum 2 chars`)
      .max(50, `${orgVerificationText} number can have maximum 50 chars`),

    qaCertifications: Yup.array()
      .required("QA certificates is required")
      .min(1, "At least 1 certificates is required"),
    CACDocument: Yup.string().required("CAC document is required"),
  });
