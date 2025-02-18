import * as Yup from "yup";

export const EmploymentDetailsSchema = (
  adminNotRequiredFields,
  taxIdNotRequired
) =>
  Yup.object().shape({
    experience: Yup.number()
      .required("Experience is required")
      .typeError("Experience is required")
      .test(
        "min",
        "Experience should be more than 0 and less than 100 years.",
        function (experienceNumber) {
          return experienceNumber > 0;
        }
      )
      .test(
        "max",
        "Experience should be more than 0 and less than 100 years.",
        function (experienceNumber) {
          return experienceNumber < 100;
        }
      ),

    countryOfBirth: adminNotRequiredFields
      ? Yup.string().notRequired().nullable()
      : Yup.string().required("Country of birth is required"),

    citizenship: adminNotRequiredFields
      ? Yup.string().notRequired().nullable()
      : Yup.string().required("Citizenship is required"),

    countryOfTax: adminNotRequiredFields
      ? Yup.string().notRequired().nullable()
      : Yup.string().required("Country of Tax is required"),

    employmentType: adminNotRequiredFields
      ? Yup.string().notRequired().nullable()
      : Yup.string().required("Employment type is required"),

    // UINPinType: Yup.string().notRequired().nullable(),

    // uniqueIdentificationNumber: Yup.string()
    //       .notRequired()
    //       .nullable()
    //       .test(
    //         "min_length",
    //         "Unique Identifiction number should be 2 to 50 characters long",
    //         function (value) {
    //           if (!!value) {
    //             const schema = Yup.string().min(2);
    //             return schema.isValidSync(value);
    //           }
    //           return true;
    //         }
    //       )
    //       .test(
    //         "max_length",
    //         "Unique Identifiction number should be 2 to 50 characters long",
    //         function (value) {
    //           if (!!value) {
    //             const schema = Yup.string().max(50);
    //             return schema.isValidSync(value);
    //           }
    //           return true;
    //         }
    //       ),

    taxId: taxIdNotRequired
      ? Yup.string()
          .notRequired()
          .nullable()
          .test(
            "min_length",
            "This should be 2 to 20 digits long",
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
            "This should be 2 to 20 digits long",
            function (value) {
              if (!!value) {
                const schema = Yup.string().max(20);
                return schema.isValidSync(value);
              }
              return true;
            }
          )
      : Yup.string().when("taxOption", {
          is: "yes",
          then: Yup.string()
            .required("Tax id is required")
            .nullable()
            .test("number", "Tax id must be greater than 0", (val) => val > 0)
            .min(2, "This should be 2 to 20 digits long")
            .max(20, "This should be 2 to 20 digits long"),
        }),
  });
