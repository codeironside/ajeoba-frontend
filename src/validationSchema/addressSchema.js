import * as Yup from "yup";
import { ZIP_CODE_REGEX } from "../Constant/AppConstant";

export const addressSchema = (zipCodeRequied) =>
  Yup.object().shape({
    addressLine1: Yup.string()
      .required("Address is required")
      .min(2, "Address should have minimum of 2 chars")
      .max(200, "Address can have maximum of 200 chars"),
    addressLine2: Yup.string()
      .notRequired()
      .nullable()
      .test(
        "min_length",
        "Address should have minimum of 2 chars",
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
        "Address can have maximum of 200 chars",
        function (value) {
          if (!!value) {
            const schema = Yup.string().max(200);
            return schema.isValidSync(value);
          }
          return true;
        }
      ),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required").nullable(),
    city: Yup.string()
      .required("City is required")
      .min(2, "City should have minimum of 2 chars")
      .max(50, "City can have maximum of 50 chars"),
    zipCode: (zipCodeRequied
      ? Yup.string().required("Zip code is required.")
      : Yup.string().notRequired().nullable()
    )
      .matches(ZIP_CODE_REGEX, "Zip code is invalid")
      .test(
        "min_length",
        "Zip code should have minimum of 5 chars",
        function (value) {
          if (!!value) {
            const schema = Yup.string().min(5);
            return schema.isValidSync(value);
          }
          return true;
        }
      )
      .test(
        "max_length",
        "Zip code can have maximum of 10 chars",
        function (value) {
          if (!!value) {
            const schema = Yup.string().max(10);
            return schema.isValidSync(value);
          }
          return true;
        }
      ),
  });
