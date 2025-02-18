import * as Yup from "yup";

export const associationProfileSchema = Yup.object().shape({
  option: Yup.string(),
  typeOfProducts: Yup.array().when("option", {
    is: "1" || "2",
    then: Yup.array()
      .required("Type of product is required")
      .min(1, "At least 1 product is required"),
  }),
  certificates: Yup.array().when("option", {
    is: "3",
    then: Yup.array()
      .required("Certificate is required")
      .min(1, "At least 1 certficate is required"),
  }),
  inputs: Yup.array().when("option", {
    is: "9",
    then: Yup.array()
      .required("Input is required")
      .min(1, "At least 1 input is required"),
  }),
  memberSize: Yup.string().when("option", {
    is: "1",
    then: Yup.string()
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
  }),
  countryOfTax: Yup.string().when("option", {
    is: "2",
    then: Yup.string().required("Country of tax is required"),
  }),
  registeredNumber: Yup.string().when("option", {
    is: "2",
    then: Yup.string().required("Registration Number is required"),
  }),
  TinNumber: Yup.string().when("option", {
    is: "2",
    then: Yup.string().required("TIN Number is required"),
  }),
  PhoneNumber: Yup.string().when("option", {
    is: "2",
    then: Yup.string().required("Phone Number is required"),
  }),
  addressOne: Yup.string().when("option", {
    is: "2",
    then: Yup.string().required("Address 1 is required"),
  }),
  countryName: Yup.string().when("option", {
    is: "2",
    then: Yup.string().required("Country name is required"),
  }),
  stateName: Yup.string().when("option", {
    is: "2",
    then: Yup.string().required("State name is required"),
  }),
  cityName: Yup.string().when("option", {
    is: "2",
    then: Yup.string().required("City name is required"),
  }),
  zipCode: Yup.string().when("option", {
    is: "2",
    then: Yup.string().required("Zip code is required"),
  }),
  corporateName: Yup.string().when("option", {
    is: "2",
    then: Yup.string().required("Corporate name is required"),
  }),
});
