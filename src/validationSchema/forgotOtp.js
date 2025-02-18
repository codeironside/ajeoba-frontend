import * as Yup from 'yup';
import { MOBILE_NUMBER_REGEX } from "../Constant/AppConstant";

export const forgotOtpSchema = Yup.object().shape({
    option: Yup.string(),
    email: Yup.string()
        .when("option", {
            is: 'email',
            then: Yup.string().required("Email is required").email('Email is invalid')
        }),
    mobile: Yup.string()
        .when("option", {
            is: 'phone',
            then: Yup.string().required("Phone number is required").matches(MOBILE_NUMBER_REGEX, 'Phone number is invalid')
        })
});