import * as Yup from "yup";

export const addInputSupplierSchema = Yup.object().shape({
  inputType: Yup.array()
    .required("Input type is required")
    .min(1, "At least 1 input type is required"),
});
