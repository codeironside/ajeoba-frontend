import * as Yup from "yup";

import { MOBILE_NUMBER_REGEX } from "../Constant/AppConstant";

export const AddFarmerSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .required("Phone number is mandatory")
    .matches(
      MOBILE_NUMBER_REGEX,
      "Phone number format is incorrect. Try Again"
    ),
});

export const AddFarmerKYCSchema = Yup.object().shape({
  uniqueIdentificationNumber: Yup.string()
    .required("VNIN/NIN number is mandatory")
});

export const AddFarmerProductSchema = Yup.object().shape({
  yield: Yup.string()
    .required("Yield is required")
    .nullable()
    .test(
      "min",
      "Yield should be more than 0 and less than 100000",
      function (yieldValue) {
        return yieldValue > 0;
      }
    )
    .test(
      "max",
      "Yield should be more than 0 and less than 100000",
      function (yieldValue) {
        return yieldValue < 100001;
      }
    ),
});
export const AddFarmerLandSchema = Yup.object().shape({
  landSize: Yup.string()
    .required("Land size is required")
    .test(
      "min",
      "Land size should be more than 0 and less than 10000",
      function (landSize) {
        return landSize > 0;
      }
    )
    .test(
      "max",
      "Land size should be more than 0 and less than 10000",
      function (landSize) {
        return landSize < 10001;
      }
    ),
});
