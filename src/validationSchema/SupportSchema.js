import * as Yup from "yup";

export const CreateSupportSchema = Yup.object().shape({
  supportPlaneName: Yup.string()
    .required("Subject is required")
    .min(1, "This should be 1 to 1000 characters long")
    .max(1000, "This should be 1 to 1000 characters long"),

  supportDesc: Yup.string()
    .required("Description is required")
    .min(1, "This should be 1 to 10000000 characters long")
    .max(10000000, "This should be 1 to 10000000 characters long"),
});
