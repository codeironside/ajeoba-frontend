import * as Yup from "yup";

export const adminQACompanySchema = (orgVerificationText) =>
  Yup.object().shape({
    adminQaCompanyPassportPhoto: Yup.string().nullable(),

    adminQaCompanyCACDocument: Yup.string().nullable(),

    adminQaCompanyName: Yup.string()
      .required("Company name is required")
      .min(2, "This should be 2 to 25 characters long")
      .max(25, "This should be 2 to 25 characters long"),

    adminQaComonayRegisrationNumber: Yup.string()
      .notRequired().nullable()
      .test(
        "min_length",
        "Registration number should have minimum of 2 chars",
        function (value) {
          if (!!value) {
            const schema = Yup.string().min(2);
            return schema.isValidSync(value);
          }
          return true;
        }
      )
      .test(
        "max_length",
        "Registration number can have maximum of 50 chars",
        function (value) {
          if (!!value) {
            const schema = Yup.string().max(50);
            return schema.isValidSync(value);
          }
          return true;
        }
      ),

    orgVerificationNumber: Yup.string()
      .notRequired().nullable()
      .test(
        "min_len",
        `${orgVerificationText} number should have minimum of 2 characters`,
        function (min_val) {
          if (!!min_val) {
            const schema = Yup.string().min(2);
            return schema.isValidSync(min_val);
          }
          return true;
        }
      )
      .test(
        "max_len",
        `${orgVerificationText} number can have maximum of 50 characters`,
        function (max_val) {
          if (!!max_val) {
            const schema = Yup.string().max(50);
            return schema.isValidSync(max_val);
          }
          return true;
        }
      ),

    adminQACompanyCertificationType: Yup.array()
      .required("QA certication is required")
      .min(1, "At least 1 certificate is required"),
  });
