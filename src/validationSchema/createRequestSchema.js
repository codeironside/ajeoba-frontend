import * as Yup from "yup";

export const createRequestSchema =Yup.object().shape({
  requestType: Yup.string(),
  productId: Yup.string().when("requestType",{
    is:"PRODUCT",
    then: Yup.string()
    .required("Product Name is required"),
  }),
  inputId: Yup.string().when("requestType",{
    is:"INPUT",
    then: Yup.string()
    .required("Input Name is required"),
  }),
  storageType: Yup.string()
  .when("requestType",{
    is:"PRODUCT",
    then: Yup.string()
    .required("Storage type is required"),
  }),
  subject: Yup.string()
    .required("Subject is required")
    .min(2, "This should be 2 to 50 characters long")
    .max(50, "This should be 2 to  50 characters long"),
  description: Yup.string()
    .required("Description is required")
    .min(2, "This should be 2 to 200 characters long")
    .max(200, "This should be 2 to 200 characters long"),
  requestToCompany: Yup.string().required(`Finance Company is required`),
});
