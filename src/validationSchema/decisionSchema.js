import * as Yup from "yup";

export const decisionSchema = () =>
  Yup.object().shape({
    decision: Yup.string().required("Decision is required"),
  });
