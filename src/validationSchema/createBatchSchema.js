import * as Yup from "yup";

export const createBatchSchema = Yup.object().shape({
  createBatchProductNameId: Yup.number().required("Product name is required"),
  createBatchProductType: Yup.string().required("Product type is required"),
  createBatchQuality: Yup.number().required("Quality is required"),
});

const farmerShape = Yup.object()
  .shape({
    farmerId: Yup.number(),
  })
  .required("Contributors is required");

export const createBatchFarmerSchema = Yup.object().shape({
  createBatchProductNameId: Yup.number().required("Product name is required"),
  createBatchProductType: Yup.string().required("Product type is required"),
  createBatchQuality: Yup.number().required("Quality is required"),
  createBatchFarmerIds: Yup.array(farmerShape).required(
    "Contributors is required"
  ),
});
