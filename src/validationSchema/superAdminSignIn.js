import * as Yup from "yup";

export const superAdminSignInSchema = Yup.object().shape({
  userId: Yup.string().required("User ID is required"),
  password: Yup.string()
    .required("Password is required"),
});

