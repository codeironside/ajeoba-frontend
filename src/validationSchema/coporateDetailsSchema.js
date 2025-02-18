import * as Yup from "yup";

export const CorporateDetailsSchema = (
  companyType,
  orgVerificationText,
  registrationRequired = true,
  tinRequired = true.valueOf
) =>
  Yup.object().shape({
    companyName: Yup.string()
      .required(`${companyType} name is required`)
      .min(2, "This should be 2 to 100 characters long")
      .max(100, "This should be 2 to 100 characters long"),
    registrationNumber: (registrationRequired
      ? Yup.string().required("Registration number is required")
      : Yup.string().notRequired().nullable()
    )
      .test(
        "min_length",
        "This should be 2 to 50 characters long",
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
        "This should be 2 to 50 characters long",
        function (value) {
          if (!!value) {
            const schema = Yup.string().max(50);
            return schema.isValidSync(value);
          }
          return true;
        }
      ),

    orgVerificationNumber: (tinRequired
      ? Yup.string().required(
          `${orgVerificationText} number should have minimum of 2 characters`
        )
      : Yup.string().notRequired().nullable()
    )
      .test(
        "min_length",
        `${orgVerificationText} number should have minimum of 2 characters`,
        function (val) {
          if (!!val) {
            const schema = Yup.string().min(2);
            return schema.isValidSync(val);
          }
          return true;
        }
      )
      .test(
        "max_length",
        `${orgVerificationText} number can have maximum of 50 characters`,
        function (val) {
          if (!!val) {
            const schema = Yup.string().max(50);
            return schema.isValidSync(val);
          }
          return true;
        }
      ),
  });
