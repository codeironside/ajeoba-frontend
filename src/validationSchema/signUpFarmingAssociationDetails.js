import * as Yup from "yup";

export const signUpFarmingAssociationDetails = (orgVerificationText) =>
  Yup.object().shape({
    associationName: Yup.string()
      .required("Association name is required")
      .min(2, "Association name should have minimum 2 chars")
      .max(100, "Association name can have maximum 100 chars"),
    associationRegNumber: Yup.string()
      .required("Association registration number is required")
      .min(2, "Association registration number should have minimum 2 chars")
      .max(50, "Association registration number can have maximum 50 chars"),

    orgVerificationNumber: Yup.string().when("hasKYC", {
      is: "yes",
      then: Yup.string()
        .required(`${orgVerificationText} number is required`)
        .min(
          2,
          `${orgVerificationText} number should have a minimum of 2 characters`
        )
        .max(
          50,
          `${orgVerificationText} number can have a maximum of 50 characters`
        ),
      otherwise: Yup.string().nullable(),
    }),

    typeOfProducts: Yup.array()
      .required("Type of product is required")
      .min(1, "At least 1 product is required"),
    memberSize: Yup.string()
      .required("Member size is required")
      .test(
        "min",
        "Member size should have minimum of 1 member",
        function (memberSize) {
          return memberSize > 0;
        }
      )
      .test(
        "max",
        "Member size can have maximum of 10000000 members",
        function (memberSize) {
          return memberSize < 1000001;
        }
      ),
    CACDocument: Yup.string().required("CAC document is required"),
    hasKYC: Yup.string().required(
      "Please select whether there is a KYC Document"
    ),
  });
