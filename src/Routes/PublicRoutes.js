import React, { lazy } from "react";
import {
  FORGOTPASSWORD,
  SIGNUPOTP,
  USERROLESELECTIONFIRST,
  SIGNUPSETUPPASSWORD,
  SIGNUPOTPVERIFICATION,
  SIGNIN,
  FORGOTPASSWORDOTPVERIFICATION,
  RESETPASSWORD,
  SUPERADMINSIGNIN,
  SUPERADMINFORGOTPASSWORDGETOTP,
  SUPERADMINFORGOTPASSWORDOTPVERIFICATION,
  SUPERADMINFORGOTPASSWORDRESETPASSWORD,
  FAQS,
  BLOGS,
  ROOT,
  VALUE_PROPOSITION,
  ABOUT_US,
  PRODUCT_LISTING_EXPANDED,
  INPUT_LISTING_EXPANDED,
  SIGNUP_BUYER_PAGE,
  SIGNUPOTPBUYERVERIFICATION,
  SIGNUPOTPINPUTSUPPLIER,
  SIGNUPOTPINPUTSUPPLIERVERIFICATION,
  SIGNUPOTPINPUTSUPPLIERDETAILS,
  SINGLE_BLOG_PAGE,
  SELECTED_PRODUCT_DETAILS,
  WHO_NEEDS_SOFTWARE,
} from "./Routes";
import SetupPassword from "../Containers/SignUp/SetupPassword/SetupPassword";

const SignupOtpView = lazy(() =>
  import("../Containers/SignUp/SignUpOtp/SignUpOtp")
);
const SignupBuyerPage = lazy(() =>
  import("../Containers/SignUp/SignUpBuyerPage/SignUpBuyerPage")
);
const SignupInputSupllyDetailsPage = lazy(() =>
  import(
    "../Containers/SignUp/SignUpInputSupplyDetailsPage/SignUpInputSupplyDetailsPage.jsx"
  )
);

const SelectUserRoleFirst = lazy(() =>
  import("../Containers/SignUp/SignUpOtp/UserRoleSelectionFirst")
);

const SignupOtpVerificationView = lazy(() =>
  import("../Containers/SignUp/SignUpOtpVerification/SignUpOtpVerification")
);
const SignInputSupplyView = lazy(() =>
  import(
    "../Containers/SignUp/SignUpOtpInputSupplier/SignUpOtpInputSupplier.jsx"
  )
);
const SignupOtpBuyerVerificationView = lazy(() =>
  import(
    "../Containers/SignUp/SignUpOtpBuyerVerification/SignUpOtpBuyerVerification"
  )
);
const SignupOtpINputSupplyVerificationView = lazy(() =>
  import(
    "../Containers/SignUp/SignUpInputSupplyOtpVerification/SignUpInputSupplyOtpVerification.jsx"
  )
);
const ForgotPasswordView = lazy(() =>
  import(
    "../Containers/ForgotPassword/ForgotPasswordGetOtp/ForgotPasswordGetOtp.jsx"
  )
);
const ForgotPasswordOtpVerificationView = lazy(() =>
  import("../Containers/ForgotPassword/OtpVerification/OtpVerification.jsx")
);

const LogIn = lazy(() => import("../Containers/SignIn/LogIn"));

const ResetPasswordView = lazy(() =>
  import("../Containers/ForgotPassword/ResetPassword/ResetPassword.jsx")
);

const SuperAdminSignInView = lazy(() =>
  import("../Containers/SuperAdmin/SignIn/SuperAdminSignIn")
);

const SuperAdminForgotPasswordOtpView = lazy(() =>
  import(
    "../Containers/SuperAdmin/ForgotPassword/ForgotPasswordGetOtp/SuperAdminForgotPasswordGetOtp"
  )
);

const SuperAdminForgotPasswordOtpVerificationView = lazy(() =>
  import(
    "../Containers/SuperAdmin/ForgotPassword/ForgotPasswordOtpVerification/SuperAdminForgotPasswordOtpVerification"
  )
);

const SuperAdminForgotPasswordResetPasswordView = lazy(() =>
  import(
    "../Containers/SuperAdmin/ForgotPassword/ForgotPasswordResetPassword/SuperAdminForgotPasswordResetPassword"
  )
);
// const ValuePropositionView = lazy(() =>
//   import("../Components/LandingPage/ValueProp/ValuePropExtended")
// );
const AboutUsView = lazy(() =>
  import("../Components/LandingPage/AboutUsPage/AboutUsPage.jsx")
);

const FaqsView = lazy(() => import("../Containers/Faqs/Faqs"));
const BlogsView = lazy(() => import("../Components/LandingPage/Blog/Blog"));
const SingleBlogPostView = lazy(() =>
  import("../Components/LandingPage/Blog/SingleBlogPage")
);
const LandingPage = lazy(() => import("../Components/LandingPage/LandingPage"));
const ExpandedProductListing = lazy(() =>
  import(
    "../Components/LandingPage/ProductListing/ProductListingExpanded/ProductListExpanded"
  )
);

const SelectedProductDetails = lazy(() =>
  import(
    "../Components/LandingPage/ProductListing/ProductDetailsContainer/ProductDetailsContainers.jsx"
  )
);

const ExpandedInputListing = lazy(() =>
  import(
    "../Components/LandingPage/InputListing/InputListingExpanded/InputListEXpanded"
  )
);

const WhoNeedsSoftware = lazy(() =>
  import(
    "../Components/LandingPage/WhoNeedsTheSoftware/WhoNeedsTheSoftware.jsx"
  )
);

const ValuePropsitionsView = lazy(() =>
  import("../Components/LandingPage/ValPropositions/Valuepropostions.jsx")
);

export const publicRoutes = [
  {
    path: ROOT,
    component: <LogIn />,
  },
  {
    path: SIGNIN,
    component: <LogIn />,
  },
  {
    path: SIGNUPOTP,
    component: <SignupOtpView />,
  },
  {
    path: USERROLESELECTIONFIRST,
    component: <SelectUserRoleFirst />,
  },
  {
    path: SIGNUP_BUYER_PAGE,
    component: <SignupBuyerPage />,
  },
  {
    path: SIGNUPOTPINPUTSUPPLIERDETAILS,
    component: <SignupInputSupllyDetailsPage />,
  },
  {
    path: SIGNUPSETUPPASSWORD,
    component: <SetupPassword />,
  },
  {
    path: SIGNUPOTPVERIFICATION,
    component: <SignupOtpVerificationView />,
  },
  {
    path: SIGNUPOTPINPUTSUPPLIER,
    component: <SignInputSupplyView />,
  },
  {
    path: SIGNUPOTPBUYERVERIFICATION,
    component: <SignupOtpBuyerVerificationView />,
  },
  {
    path: SIGNUPOTPINPUTSUPPLIERVERIFICATION,
    component: <SignupOtpINputSupplyVerificationView />,
  },
  {
    path: FORGOTPASSWORD,
    component: <ForgotPasswordView />,
  },
  {
    path: FORGOTPASSWORDOTPVERIFICATION,
    component: <ForgotPasswordOtpVerificationView />,
  },
  {
    path: RESETPASSWORD,
    component: <ResetPasswordView />,
  },
  {
    path: SUPERADMINSIGNIN,
    component: <SuperAdminSignInView />,
  },
  {
    path: SUPERADMINFORGOTPASSWORDGETOTP,
    component: <SuperAdminForgotPasswordOtpView />,
  },
  {
    path: SUPERADMINFORGOTPASSWORDOTPVERIFICATION,
    component: <SuperAdminForgotPasswordOtpVerificationView />,
  },
  {
    path: SUPERADMINFORGOTPASSWORDRESETPASSWORD,
    component: <SuperAdminForgotPasswordResetPasswordView />,
  },
  {
    path: BLOGS,
    component: <BlogsView />,
  },
  {
    path: SINGLE_BLOG_PAGE,
    component: <SingleBlogPostView />,
  },
  {
    path: PRODUCT_LISTING_EXPANDED,
    component: <ExpandedProductListing />,
  },
  {
    path: INPUT_LISTING_EXPANDED,
    component: <ExpandedInputListing />,
  },
  {
    path: SELECTED_PRODUCT_DETAILS,
    component: <SelectedProductDetails />,
  },
];
