import * as Yup from "yup";

export const AddItemSchema = Yup.object().shape({
  itemName: Yup.string()
    .required("Item name is required")
    .min(2, "This should be 2 to 50 characters long")
    .max(50, "This should be 2 to 50 characters long"),
});
