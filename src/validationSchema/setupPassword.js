import * as Yup from 'yup';
import { PASSWORD_REGEX_WITH_SPECIAL_CHARACTERS, PASSWORD_REGEX } from '../Constant/AppConstant';

export const setupPasswordSchema = Yup.object().shape({
    option: Yup.string(),
    password: Yup.string()
        .when("option", {
            is: "both",
            then: Yup.string()
                .required("Password is required")
                .matches(
                    PASSWORD_REGEX_WITH_SPECIAL_CHARACTERS,
                    "Password is invalid"
                ),
            otherwise: Yup.string()
                .required('Password is required')
                .matches(PASSWORD_REGEX, 'Password is invalid')
        }),
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
});