import * as Yup from "yup";

export const FeedbackSchema = Yup.object().shape({
  feedback: Yup.string()
    .required("Feedback  is required")
    .min(2, "This should be 2 to 10000000 characters long")
    .max(10000000, "This should be 2 to 10000000 characters long"),

  rating: Yup.string().required("Rating  is required"),
});
