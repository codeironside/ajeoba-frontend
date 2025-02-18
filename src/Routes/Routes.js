export const ROOT = "/";
export const FORGOTPASSWORD = "/forgot-password";
export const SIGNUPOTP = "/signup-otp";
export const USERROLESELECTIONFIRST = "/select-user-role";
export const SIGNUPSETUPPASSWORD = "/setup-password";
export const SIGNUPOTPVERIFICATION = "/signup-otp-verification";
export const SIGNIN = "/signin";
export const SIGNUP_BUYER_PAGE = "/signup-buyer";
export const SIGNUPOTPINPUTSUPPLIER = "/signup-inputsupply";
export const SIGNUPOTPINPUTSUPPLIERVERIFICATION = "/signupotp-inputsupply";
export const SIGNUPOTPINPUTSUPPLIERDETAILS = "/signupotp-inputsupply-details";
export const SIGNUPOTPBUYERVERIFICATION = "/signupotp-buyer";

export const USERROLESELECTION = "/user-role-selection";
export const SIGNUPPERSONALDETAILS = "/signup-personal-details";
export const SIGNUPACCOUNTDETAILS = "/signup-account-details";
export const KYCVERIFICATION = "/kyc-verification";
export const FORGOTPASSWORDOTPVERIFICATION =
  "/forgot-password-otp-verification";

export const RESETPASSWORD = "/reset-password";
export const FARMER_OTP_VERIFICATION = "/otp/send";
export const PROFILEFARMINGASSOCIATION = "/profile-farming-association";
export const CHANGEPASSWORD = "/change-password";
export const VIEWSUPPORT = "/help-support";
export const DASHBOARD = "/dashboard";
export const REFEREES = "/referees";
export const ADD_REFEREES = "add";
export const FARMER_KYC_VERIFICATION = "farmer-kyc-verification";

export const FARMERS = "/farmers";
export const FARMERS_DETAIL = "detail/:id";
export const FARMERS_EDIT = "edit/:id";
export const COMPLETE_KYC_VNIN = "complete-kyc-vnin";

export const FARMERS_BULK_UPLOAD = "/farmers/add-multiple-farmers";

export const ADD_FARMER_OTP_VERIFICATION =
  "/farmers/add-farmer-otp-verification";
export const ADD_FARMER_VNIN_VERIFICATION =
  "/farmers/add-farmer-vnin-verification";
export const ADD_FARMERS_LAND_DETAILS = "/farmers/add-land-details";
export const ADD_FARMER_PERSONAL_DETAILS =
  "/farmers/add-farmer-personal-details";
export const ADD_FARMER_PRODUCT = "/farmers/add-farmer-product";
export const ADD_FARMER_REFEREE_SELECTION =
  "/farmers/add-farmer-referee-selection";
export const ADD_FARMER_KYC_VERIFICATION =
  "/farmers/add-farmer-kyc-verification";
export const AGGREGATIONS = "/aggregations";
export const ADD_AGGREGATION = "add";
export const QAADS = "/qa-ads";
export const CREATE_ADS = "create";
export const QA_ADS_DETAIL = "detail/:id";

export const WAREHOUSES = "/warehouses";
export const ADD_WAREHOUSE = "add";
export const WAREHOUSE_DETAIL = "detail/:id";
export const WAREHOUSE_EDIT = "edit/:id";

export const FINANCE = "/finance";
export const CREATE_FINANCE_REQUEST = "create-request";
export const FINANCE__PRODUCT_REQUEST_DETAIL = "detail/product/:id";
export const FINANCE__INPUT_REQUEST_DETAIL = "detail/input/:id";

export const LOGISTICS = "/logistics";
export const LOGISTICS_CREATE_AD = "create-ad/:id";
export const LOGISTICS_AD_DETAIL = "detail/logistic-ad/:id";
export const MARKETPLACE = "/marketplace";
export const CREATE_ADS_MARKETPLACE = "create-ads-marketplace";
export const CREATE_ADS_MARKETPLACE_BY_ID = "create-ad-marketplace/:id";
export const ACTIVE_ADS_MARKETPLACE_DETAIL = "active-ads/detail/:id";
export const ACTIVE_ADS_MARKETPLACE_EDIT = "active-ads/edit/:id";
export const RECIEVED_ORDER_MARKETPLACE_DETAIL = "recieved-order/detail/:id";

export const INPUT = "/input";
export const INPUT_ACTIVE_ADS_DETAIL = "active-ads/:id";
export const INPUT_ORDER_DETAIL = "order/:id";
export const ORDER_DETAIL_INPUT = "input-details/:id";
export const INVENTORY = "/inventory";
export const BATCH_DETAIL = "batch-detail/:id";
export const CREATE_BATCHES = "create-batches";

export const INPUT_INVENTROY = "/input-inventory";
export const INPUT_INVENTROY_EDIT = "edit/:id";

export const SUPERADMINSIGNIN = "/admin/signin";
export const SUPERADMINFORGOTPASSWORDGETOTP = "/admin/forgot-password";
export const SUPERADMINFORGOTPASSWORDOTPVERIFICATION =
  "/admin/forgot-password-otp-verification";
export const SUPERADMINFORGOTPASSWORDRESETPASSWORD =
  "/admin/forgot-password-reset-password";
export const ADMIN_MANAGEMENT = "/admin/admin-management";
export const COMISSION_MANAGEMENT = "/admin/comission-management";
export const SUBSCRIPTION_MANAGEMENT = "/admin/subscription-management";
export const CREATE_SUBSCRIPTION_PLAN = "create-subscription-plan";
export const MASTER_MANAGEMENT = "/admin/master-management";
export const ADD_ITEMS = "add-items";
export const EDIT_ITEMS = "edit/item/:id";
export const PRODUCT_MASTER = "/admin/product-master";
export const ADD_PRODUCT = "add-product";
export const EDIT_PRODUCT = "product/edit/:id";
export const INPUT_MASTER = "/admin/input-master";
export const EDIT_INPUT = "edit/input/:id";
export const ADD_INPUT = "add-input";

export const ADMIN_USER_MANAGEMENT = "/admin/user-management";
export const ADMIN_FARMER_ASSOCIATION_SUBSCRIPTION =
  "/admin/farming-association-subscription";

export const PRIVATE_POLICY_MANAGEMENT = "/admin/private-policy-management";
export const TERMS_AND_CONDITIONS_MANAGEMENT =
  "/admin/terms-and-conditions-management";
export const MANAGE_SUPPORT = "/admin/manage-support";

export const ADMIN_FARMING_ASSOCIATION = "farming-association";
export const ADMIN_ADD_FARMING_ASSOCIATION = "add";
export const ADMIN_EDIT_FARMING_ASSOCIATION = "edit/:id";
export const ADMIN_DETAIL_FARMING_ASSOCIATION = "detail/:id";
export const ADMIN_EDIT_REFEREE = "referee/:associationId/edit/:id";
export const ADMIN_DETAIL_REFEREE = "referee/:associationId/detail/:id";
export const ADMIN_EDIT_FARMER = "farmer/:associationId/edit/:id";
export const ADMIN_DETAIL_FARMER = "farmer/:associationId/detail/:id";

export const ADMIN_AGGREGATORS = "aggregators";
export const ADMIN_DETAIL_AGGREGATOR = "detail/:id";
export const ADMIN_EDIT_AGGREGATOR = "edit/:id";
export const ADMIN_ADD_AGGREGATOR = "add/aggregator";
export const ADMIN_INPUT_SUPPLIER = "input-supplier";
export const INPUT_SUPPLIER_RECEIVED_ORDERS = "/received-orders";
export const INPUT_SUPPLIER_RECEIVED_ORDERS_DETAIL = "detail/:id";
export const ADMIN_INPUT_SUPPLIER_ADD = "add";
export const ADMIN_INPUT_SUPPLIER_DETAIL = "detail/:id";
export const ADMIN_INPUT_SUPPLIER_EDIT = "edit/:id";
export const ADMIN_SINGLE_BUYER = "single-buyer";
export const ADMIN_ADD_SINGLE_BUYER = "add";
export const ADMIN_SINGLE_BUYER_DETAIL = "detail/:id";
export const ADMIN_SINGLE_BUYER_EDIT = "edit/:id";

export const ADMIN_CORPORATE_BUYER = "corporate-buyer";
export const ORDER_DETAIL = "order-detail/:id";
export const INP_ORDER_DETAIL = "order-input-detail/:id";
export const ADMIN_CORPORATE_BUYER_DETAIL = "detail/:id";
export const ADMIN_ADD_CORPORATE_BUYER = "add";
export const ADMIN_EDIT_CORPORATE_BUYER = "edit/:id";
export const ADMIN_DETAIL_CORPORATE_BUYER = "detail/:id";

export const ADMIN_FINANCE = "finance";
export const ADMIN_ADD_FINANCE = "add";
export const ADMIN_FINANCE_COMPANY_DETAIL = "detail/:id";
export const ADMIN_FINANCE_COMPANY_EDIT = "edit/:id";

export const ADMIN_LOGISTICS = "logistics";
export const ADMIN_ADD_LOGISTICS = "add";
export const ADMIN_EDIT_LOGISTICS = "edit/:id";
export const ADMIN_DETAIL_LOGISTICS = "detail/:id";
export const ADMIN_EDIT_TRUCK = ":logisticCompanyId/truck/edit/:id";
export const ADMIN_DETAIL_TRUCK = ":logisticCompanyId/truck/detail/:id";

export const ADMIN_QA_COMPANIES = "qa-companies";
export const ADMIN_ADD_QA_COMPANIES = "add";
export const ADMIN_DETAIL_QA_COMPANIES = "detail/:id";
export const ADMIN_EDIT_QA_COMPANIES = "edit/:id";

export const FAQS_MANAGEMENT = "/admin/faqs-management";
export const FAQS_MANAGEMENT_ADD = "add";
export const FAQS_MANAGEMENT_EDIT = "edit/:id";
export const FAQS = "/faqs";

export const BLOG_MANAGEMENT = "/admin/blog-management";
export const BLOG_MANAGEMENT_ADD = "add";
export const BLOG_MANAGEMENT_EDIT = "edit/:id";

export const REPORTS = "/reports";
export const PRODUCT_SOLD_VIEW_MORE = "product-sold/info/:id";
export const PRODUCT_AGGREGATION_VIEW_MORE = "product-aggregation/info/:id";
export const INPUT_PURCHASED_VIEW_MORE = "purchased/info/:id";
export const INPUT_SOLD_INFO = "sold/info/:id";

export const ADD_ADMIN = "add";
export const EDIT_ADMIN = "edit/:id";
export const ADD_TERMS_AND_CONDITION = "/admin/terms-and-condition";
export const ADD_PRIVACY_POLICY = "/admin/privacy-policy";

export const SUBSCRIPTION = "/subscription";
export const FA_SUBSCRIPTION = "/subscription";
export const SUBSCRIPTION_DETAILS = "details/:id";
export const FARMING_ASSOCIATION_SUBSCRIPTION_DETAILS = "details/:id";

export const FARMER_SUBSCRIPTION = "/subscriptions";
export const FARMER_SUBSCRIPTION_DETAIL = "detail/:id";
export const FARMER_SUBSCRIPTION_CONTROL = "controls";

export const PAYMENT_PURCHASE_SUBSCRIPTION = "/payment/order";
export const OPEN_ADS = "/open-ads";
export const CERTIFICATE_REQUESTS = "certificate/requests";

export const TRUCK_INFORMATION = "/truck-information";
export const TRUCK_DETAILS = "details/:id";
export const ADD_TRUCKS = "add";
export const LOGISTICS_REQUESTS = "/logistics-requests";
export const TRANSIT_ORDERS = "/transit-orders";
export const TRANSIT_ORDER_DETAIL_VIEW = "transit-order/detail/:id";

export const TRADING = "/trading";
export const _INPUT_ORDER_DETAIL = "trade-input-details/:id";
export const PRODUCT_ORDER_DETAIL = "trade-product-details/:id";
export const TRADING_PRODUCT_DETAILS = "product-details/:id";
export const VIEWPROFILE = "/my-profile";
export const TRADING_ACTIVE_AD_DEATILS = "active-ads/details/:id";
export const TERMS_AND_CONDITIONS = "terms-and-conditions";
export const TRADING_ORDER_DEATILS = "order/details/:id";
export const PRIVACY_POLICY = "privacy-policy";

export const SUPPORT_REQUEST_DETAIL_VIEW = "detail/:id";
export const FINANCE_REQUESTS = "/finance-requests";
export const ADMIN_FINANCE_REQUESTS = "/admin/finance-requests";
export const FINANCE_REQUEST_DETAIL_VIEW = "detail/:id";

export const HARVEST_INFORMATION =
  "/finance-requests/additional-detail/:id/farmer-detail/:farmerId/harvest-info";
export const FINANCE_ADDITIONAL_DETAIL_VIEW = "additional-detail/:id";
export const FINANCE_FARMER_DETAIL_VIEW =
  "additional-detail/:id/farmer-detail/:farmerId";

export const ADMIN_REVENUE_PAYMENTS = "/revenue/payments";
export const ADMIN_REVENUE_TRANSACTION_HISTORY = "transaction/history";

export const SELLER_WALLET = "/seller-wallet";
export const BUYER_WALLET = "/buyer-wallet";
export const BUYER_MANAGE_LOGISTIC = "/buyer-manage-logistic";

export const ADMIN_PRODUCT_ORDER_QA = "/admin-product-order-qa";
export const ADMIN_PRODUCT_ORDER_QA_DETAIL = "detail/:id";

export const PRODUCT_ORDER_QA = "/product-order-qa";
export const PRODUCT_ORDER_QA_UPLOAD_REPORT = "report/:id";

export const VALUE_PROPOSITION = "our-value-propositions";
export const ABOUT_US = "about-us";
export const BLOGS = "/blog";
export const SINGLE_BLOG_PAGE = "/blog/:id";

export const PRODUCT_LISTING_EXPANDED =
  "/view-marketplace/:producttype?/:categoryfilter?";
export const SELECTED_PRODUCT_DETAILS = "/details/:productname/:id";
export const INPUT_LISTING_EXPANDED = "/inputs";
export const LOGISTICSQUOTAION = "quotation/:id";
export const BANK_MANAGEMENT = "/bank-list";
export const BANK_CARD_REQUEST = "/card-request";

export const WHO_NEEDS_SOFTWARE = "/personas";

export const RETAILMARKET_CREATEADS = "creatads";
export const RETAILMARKET = "/retail-market";
export const RETAILMARKET_RECIEVEDORDERS_DETAIL =
  "orders/details/:id";
export const RETAILMARKETADS_EDIT = "activead/edit/:id";
export const RETAILMARKET_ADDETAIL = "activead/detail/:id";
// export const RETAILMARKETADSEDEtail = "/retail-market/detail/:id";
