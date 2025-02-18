import * as Yup from "yup";

export const CreateFarmerAssociationSubscriptionSchema = Yup.object().shape({
  numberOfFarmers: Yup.number()
    .required("Number of farmers is required")
    .min(1, "This should be at least 1 farmers")
    .max(50000, "This should be at most 50000 farmers"),
  duration: Yup.number()
    .required("Duration is required")
    .min(1, "Duration must be greater than 0")
    .max(99, "Duration should be at most 99 months"),
});

export const CreateFarmerSubscriptionSchema = Yup.object().shape({
  farmerNumber: Yup.string()
    .required("Number of farmers is required")
    .min(1, "This should be 1 to 50 characters long")
    .max(50, "This should be 2 to 50 characters long"),
  userRole: Yup.object().test("userRole", "User role is required", (val) =>
    !val ? false : true
  ),
});

export const CreateSubscriptionSchema = Yup.object().shape({
  planName: Yup.string()
    .required("Plan name is required")
    .min(2, "This should be 2 to 50 characters long")
    .max(50, "This should be 2 to 50 characters long"),
  userRole: Yup.object().test("userRole", "User role is required", (val) =>
    !val ? false : true
  ),
  cost: Yup.string()
    .required("Cost is required")
    .test("number", "Cost must be greater than 0", (val) => parseFloat(val) > 0)
    .min(2, "This should be 2 to 10 digits long")
    .max(12, "This should be 2 to 10 digits long"),
  duration: Yup.string()
    .required("Duration is required")
    .test(
      "number",
      "Duration must be greater than 0",
      (val) => parseInt(val) > 0
    )
    .min(1, "This should be 1 to 2 digits long")
    .max(2, "This should be 1 to 2 digits long"),
  description: Yup.string()
    .required("Description is required")
    .min(2, "This should be 2 to 200 characters long")
    .max(200, "This should be 2 to 200 characters long"),
});
