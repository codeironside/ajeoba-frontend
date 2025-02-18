import * as Yup from "yup";

export const productOrderQASchema = Yup.object().shape({
  certificate_document_id: Yup.string(),
  productOrderQAId: Yup.string(),
  subject: Yup.string()
    .min(2, "This should be 2 to 50 characters long")
    .max(50, "This should be 2 to  50 characters long"),
  description: Yup.string()
    .min(2, "This should be 2 to 200 characters long")
    .max(200, "This should be 2 to 200 characters long"),
});
