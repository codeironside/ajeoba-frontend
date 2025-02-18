import { combineReducers } from "redux";
import setupPasswordReducer from "./SetupPassword/setupPasswordReducer";
import userRoleSelectionReducer from "./UserRoleSelection/userRoleSelectionReducer";
import signInPasswordReducer from "./SignIn/signInPasswordReducer";
import getCountriesReducer from "./common/Countries/getCountriesReducer";
import signUpFarmingAssociationDetailsReducer from "./signUpFarmingAssociationDetails/signUpFarmingAssociationDetailsReducer";
import getStateReducer from "./common/States/getStateReducer";
import otpReducer from "./common/otp/otpReducer";
import productsReducer from "./common/Products/productsReducer";
import signUpPersonalDetailsReducer from "./SignUpPersonalDetails/signUpPersonalDetailsReducer";
import loaderReducer from "./Loader/LoaderReducer";
import profileReducer from "./Profile/profileReducer";
import refereesReducer from "./FarmingAssociation/Refrees/refereesReducer";
import adminManagementReducer from "./SuperAdmin/AdminManagement/adminManagementReducer";
import adminEditorReducer from "./SuperAdmin/AdminEditor/adminEditorReducer";
import farmingAssociationDetailReducer from "./SuperAdmin/UserManagement/FarmingAssociationDetails/farmingAssociationDetailReducer";
import ProductMasterReducer from "./SuperAdmin/ProductMaster/productMasterReducer";
import farmingAssociationReducer from "./SuperAdmin/UserManagement/FarmingAssociation/farmingAssociationReducer";
import masterManagementReducer from "./SuperAdmin/MasterManagement/masterManagementReducer";
import aggregatorDetailReducer from "./SuperAdmin/UserManagement/AggregatorDetails/aggregatorDetailReducer";
import aggregatorsReducer from "./SuperAdmin/UserManagement/Aggregators/aggregatorsReducer";
import statusReducer from "./common/Status/statusReducer";
import inputMasterReducer from "./SuperAdmin/InputMaster/inputMasterReducer";
import documentReducer from "./common/Document/documentReducer";
import farmersReducer from "./FarmingAssociation/Farmers/farmersReducer";
import wareHouseReducer from "./WareHouses/wareHouseReducer";
import getMasterDataReducer from "./common/GetMasterData/getMasterDataReducer";
import aggregationReducer from "./FarmingAssociation/Aggregation/aggregationReducer";
import qaAdsReducer from "./FarmingAssociation/QaAds/qaAdsReducer";
import inventoryReducer from "./FarmingAssociation/Inventory/inventoryReducer";
import signUpQACompanyDetailsReducer from "./SignUpQACompanyDetails/signUpQACompanyDetailsReducer";
import subscriptionReducer from "./SuperAdmin/Subscription/subscriptionReducer";
import companyReducer from "./common/QACompany/companyReducer";
import getQaAdsReducer from "./common/GetQaAds/getQaAdsReducer";
import qaCompanyDetailReducer from "./SuperAdmin/UserManagement/QACompany/qaCompanyDetailReducer";
import logisticCompanyReducer from "./common/LogisticCompany/logisticCompanyReducer";
import marketplaceReducer from "./FarmingAssociation/MarketPlace/marketplaceReducer";
import purchaseSubscriptionReducer from "./PurchaseSubscription/purchaseSubscriptionReducer";
import helpSupportReducer from "./HelpAndSupport/HelpAndSupportReducers";
import tradingReducer from "./CorporateBuyer/Trading/tradingReducer";
import blogReducer from "./SuperAdmin/BlogManagement/blogReducer"
import logisticsReducer from "./Logistics/logisticsReducer";
import logisticAdsReducer from "./FarmingAssociation/LogisticAds/logisticAdsReducer";
import LogisticsAndSellerFeedbackReducer from "./LogisticsAndSellerFeedback/LogisticsAndSellerFeedbackReducer";
import corporateBuyerReducer from "./SuperAdmin/UserManagement/CorporateBuyer/corporateBuyerReducer";
import faqReducer from "./SuperAdmin/FaqManagement/faqReducer";
import signUpSingleBuyerDetailsReducer from "./SignUpSingleBuyerDetails/signUpSingleBuyerDetailsReducer";
import singleBuyerReducer from "./SuperAdmin/UserManagement/SingleBuyer/singleBuyerReducer";
import financeCompanyReducer from "./SuperAdmin/UserManagement/FinanceCompany/financeCompanyReducer";
import inputSupplierReducer from "./SuperAdmin/UserManagement/InputSupplier/inputSupplierReducer";
import inputInventoryReducer from "./InputSupplier/InputInventory/InputInventoryReducer";
import financeReducer from "./FarmingAssociation/Finance/FinanceReducer";
import inputReducer from "./FarmingAssociation/Input/inputReducer";
import dashboardReducer from "./FarmingAssociation/Dashboard/dashboardReducer";
import financeRequestsReducer from "./FinanceCompany/FinanceRequests/financeRequestsReducer";
import adminFinanceRequestsReducer from "./SuperAdmin/FinanceRequests/adminFinanceRequestsReducer";
import reportsReducer from "./FarmingAssociation/Reports/reportsReducer";
import adminDashboardReducer from "./SuperAdmin/Dashboard/adminDashboardReducer";
import inputSupplierReportsReducer from "./InputSupplier/InputSupplierReports/inputSupplierReportsReducer";
import profileVerificationReducer from "./common/ProfileVerification/profileVerifIcationReducer";
import reportsAdminReducer from "./SuperAdmin/ReportsAdmin/reportsAdminReducer";
import notificationReducer from "./common/Notification/notificationReducer";
import revenuePaymentsReducer from "./SuperAdmin/RevenuePayments/revenuePaymentsReducer";


const reducers = {
  setPassword: setupPasswordReducer,
  userRoleSelection: userRoleSelectionReducer,
  signIn: signInPasswordReducer,
  countries: getCountriesReducer,
  states: getStateReducer,
  associationDetails: signUpFarmingAssociationDetailsReducer,
  otp: otpReducer,
  products: productsReducer,
  personalDetails: signUpPersonalDetailsReducer,
  loader: loaderReducer,
  profile: profileReducer,
  referee: refereesReducer,
  adminManagement: adminManagementReducer,
  adminEditor: adminEditorReducer,
  userManagementAssociationDetails: farmingAssociationDetailReducer,
  productMaster: ProductMasterReducer,
  farmingAssociation: farmingAssociationReducer,
  qaCompanyDetails: signUpQACompanyDetailsReducer,
  masterManagement: masterManagementReducer,
  userManagementAggregatorDetails: aggregatorDetailReducer,
  aggregators: aggregatorsReducer,
  setStatus: statusReducer,
  inputMaster: inputMasterReducer,
  docReducer: documentReducer,
  farmers: farmersReducer,
  wareHouse: wareHouseReducer,
  masterData: getMasterDataReducer,
  aggregation: aggregationReducer,
  subscription: subscriptionReducer,
  inventory: inventoryReducer,
  qaAds: qaAdsReducer,
  companies: companyReducer,
  qaAdsData: getQaAdsReducer,
  qaCompanyDetail: qaCompanyDetailReducer,
  logisticCommonData: logisticCompanyReducer,
  logisticAds: logisticAdsReducer,
  logistics: logisticsReducer,
  marketplace: marketplaceReducer,
  purchaseSubscription: purchaseSubscriptionReducer,
  helpAndSupport: helpSupportReducer,
  tradingActiveAds: tradingReducer,
  LogisticsAndSellerFeedbackReducer: LogisticsAndSellerFeedbackReducer,
  corporateBuyer: corporateBuyerReducer,
  faq: faqReducer,
  signUpBuyer: signUpSingleBuyerDetailsReducer,
  singleBuyer: singleBuyerReducer,
  financeCompany: financeCompanyReducer,
  inputSupplier: inputSupplierReducer,
  inputInventory: inputInventoryReducer,
  financeRequests: financeReducer,
  input: inputReducer,
  dashboard: dashboardReducer,
  financeCompanyRequests: financeRequestsReducer,
  adminFinanceRequestsReducer: adminFinanceRequestsReducer,
  reports: reportsReducer,
  adminDashboard: adminDashboardReducer,
  inputSupplierReports: inputSupplierReportsReducer,
  profileVerification: profileVerificationReducer,
  reportsAdmin: reportsAdminReducer,
  notification: notificationReducer,
  adminRevenuePayments: revenuePaymentsReducer,
  blog: blogReducer,
};

const reducer = combineReducers(reducers);

export default (state, action) => reducer(state, action);
