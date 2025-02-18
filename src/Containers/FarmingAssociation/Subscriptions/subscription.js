import * as Yup from "yup";

export const subscriptionSchema = Yup.object().shape({
  noOfFarmers: Yup.string().required("Farmer count cannot be 0"),
  subDuration: Yup.string().required("Duration is required"),
});

