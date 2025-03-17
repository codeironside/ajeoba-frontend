import React, { lazy } from "react";
import ProfileFarmingAssociation from "../Containers/FarmingAssociation/ProfileFarmingAssociation";
import { getUserData } from "../Services/localStorageService";
import {
  SIGNUPPERSONALDETAILS,
  USERROLESELECTION,
  SIGNUPACCOUNTDETAILS,
  KYCVERIFICATION,
  DASHBOARD,
  PROFILEFARMINGASSOCIATION,
  REFEREES,
  FARMERS,
  ADD_FARMERS_LAND_DETAILS,
  ADD_FARMER_OTP_VERIFICATION,
  ADD_FARMER_VNIN_VERIFICATION,
  COMPLETE_KYC_VNIN,
  ADD_FARMER_PERSONAL_DETAILS,
  AGGREGATIONS,
  QAADS,
  QA_ADS_DETAIL,
  WAREHOUSES,
  FINANCE,
  LOGISTICS,
  MARKETPLACE,
  INPUT,
  INVENTORY,
  SELLER_WALLET,
  BUYER_WALLET,
  CHANGEPASSWORD,
  VIEWPROFILE,
  VIEWSUPPORT,
  ADD_REFEREES,
  FARMER_KYC_VERIFICATION,
  ADMIN_MANAGEMENT,
  SUBSCRIPTION_MANAGEMENT,
  MASTER_MANAGEMENT,
  PRODUCT_MASTER,
  INPUT_MASTER,
  TERMS_AND_CONDITIONS_MANAGEMENT,
  MANAGE_SUPPORT,
  ADMIN_SINGLE_BUYER,
  ADMIN_CORPORATE_BUYER,
  ADMIN_FARMING_ASSOCIATION,
  ADD_ADMIN,
  EDIT_ADMIN,
  ADMIN_AGGREGATORS,
  ADMIN_FINANCE,
  ADMIN_LOGISTICS,
  ADMIN_QA_COMPANIES,
  ADMIN_USER_MANAGEMENT,
  ADMIN_FARMER_ASSOCIATION_SUBSCRIPTION,
  FAQS_MANAGEMENT,
  BLOG_MANAGEMENT,
  BLOG_MANAGEMENT_ADD,
  BLOG_MANAGEMENT_EDIT,
  REPORTS,
  ADD_PRIVACY_POLICY,
  ADMIN_ADD_FARMING_ASSOCIATION,
  ADMIN_EDIT_FARMING_ASSOCIATION,
  ADMIN_DETAIL_FARMING_ASSOCIATION,
  ADD_PRODUCT,
  ADMIN_DETAIL_AGGREGATOR,
  ADMIN_EDIT_AGGREGATOR,
  ADMIN_EDIT_REFEREE,
  ADMIN_DETAIL_REFEREE,
  ADMIN_EDIT_FARMER,
  ADMIN_DETAIL_FARMER,
  ADD_ITEMS,
  ADD_INPUT,
  ADMIN_ADD_AGGREGATOR,
  ADD_FARMER_PRODUCT,
  ADD_WAREHOUSE,
  WAREHOUSE_DETAIL,
  WAREHOUSE_EDIT,
  EDIT_ITEMS,
  EDIT_PRODUCT,
  EDIT_INPUT,
  ADD_AGGREGATION,
  ADD_FARMER_REFEREE_SELECTION,
  ADD_FARMER_KYC_VERIFICATION,
  CREATE_ADS,
  SUBSCRIPTION,
  FA_SUBSCRIPTION,
  OPEN_ADS,
  CERTIFICATE_REQUESTS,
  ADMIN_ADD_QA_COMPANIES,
  ADMIN_DETAIL_QA_COMPANIES,
  ADMIN_EDIT_QA_COMPANIES,
  CREATE_BATCHES,
  CREATE_SUBSCRIPTION_PLAN,
  FARMERS_DETAIL,
  LOGISTICS_AD_DETAIL,
  TRUCK_INFORMATION,
  ADD_TRUCKS,
  BATCH_DETAIL,
  CREATE_ADS_MARKETPLACE,
  ACTIVE_ADS_MARKETPLACE_DETAIL,
  ACTIVE_ADS_MARKETPLACE_EDIT,
  TRUCK_DETAILS,
  LOGISTICS_REQUESTS,
  TRANSIT_ORDERS,
  TRADING,
  ORDER_DETAIL,
  INP_ORDER_DETAIL,
  _INPUT_ORDER_DETAIL,
  PRODUCT_ORDER_DETAIL,
  PAYMENT_PURCHASE_SUBSCRIPTION,
  SUBSCRIPTION_DETAILS,
  FARMING_ASSOCIATION_SUBSCRIPTION_DETAILS,
  TRADING_ACTIVE_AD_DEATILS,
  FAQS_MANAGEMENT_ADD,
  FAQS_MANAGEMENT_EDIT,
  RECIEVED_ORDER_MARKETPLACE_DETAIL,
  ADMIN_CORPORATE_BUYER_DETAIL,
  ADMIN_EDIT_CORPORATE_BUYER,
  TRADING_PRODUCT_DETAILS,
  TERMS_AND_CONDITIONS,
  TRADING_ORDER_DEATILS,
  PRIVACY_POLICY,
  ADMIN_ADD_CORPORATE_BUYER,
  ADMIN_ADD_SINGLE_BUYER,
  ADMIN_DETAIL_LOGISTICS,
  ADMIN_EDIT_LOGISTICS,
  LOGISTICS_CREATE_AD,
  ADMIN_SINGLE_BUYER_DETAIL,
  ADMIN_SINGLE_BUYER_EDIT,
  ADMIN_ADD_LOGISTICS,
  ADMIN_EDIT_TRUCK,
  ADMIN_DETAIL_TRUCK,
  ADMIN_ADD_FINANCE,
  ADMIN_FINANCE_COMPANY_DETAIL,
  ADMIN_FINANCE_COMPANY_EDIT,
  TRANSIT_ORDER_DETAIL_VIEW,
  CREATE_ADS_MARKETPLACE_BY_ID,
  CREATE_FINANCE_REQUEST,
  ADMIN_INPUT_SUPPLIER,
  ADMIN_INPUT_SUPPLIER_DETAIL,
  ADMIN_INPUT_SUPPLIER_EDIT,
  ADMIN_INPUT_SUPPLIER_ADD,
  SUPPORT_REQUEST_DETAIL_VIEW,
  FINANCE_REQUESTS,
  INPUT_INVENTROY,
  FINANCE__PRODUCT_REQUEST_DETAIL,
  INPUT_ACTIVE_ADS_DETAIL,
  INPUT_ORDER_DETAIL,
  ORDER_DETAIL_INPUT,
  INPUT_INVENTROY_EDIT,
  INPUT_SUPPLIER_RECEIVED_ORDERS,
  INPUT_SUPPLIER_RECEIVED_ORDERS_DETAIL,
  ADMIN_FINANCE_REQUESTS,
  FINANCE_REQUEST_DETAIL_VIEW,
  HARVEST_INFORMATION,
  FINANCE_ADDITIONAL_DETAIL_VIEW,
  FINANCE_FARMER_DETAIL_VIEW,
  INPUT_SOLD_INFO,
  PRODUCT_AGGREGATION_VIEW_MORE,
  INPUT_PURCHASED_VIEW_MORE,
  PRODUCT_SOLD_VIEW_MORE,
  ADMIN_REVENUE_PAYMENTS,
  FARMERS_BULK_UPLOAD,
  FARMERS_EDIT,
  ADMIN_PRODUCT_ORDER_QA,
  ADMIN_PRODUCT_ORDER_QA_DETAIL,
  PRODUCT_ORDER_QA,
  PRODUCT_ORDER_QA_UPLOAD_REPORT,
  FARMER_SUBSCRIPTION,
  FARMER_SUBSCRIPTION_DETAIL,
  FARMER_SUBSCRIPTION_CONTROL,
  LOGISTICSQUOTAION,
  BANK_MANAGEMENT,
  BANK_CARD_REQUEST,
  RETAILMARKET,
  RETAILMARKET_CREATEADS,
  RETAILMARKET_ADDETAIL,
  RETAILMARKET_RECIEVEDORDERS_DETAIL,
  RETAILMARKETADS_EDIT,
} from "./Routes";
import dashboardIcon from "../Assets/Images/dashboard_icon.svg";
import dashboardActiveIcon from "../Assets/Images/dashboardActiveIcon.svg";
import refereesIcon from "../Assets/Images/referees_icon.svg";
import refereesActiveIcon from "../Assets/Images/candidatesActiveIcon.svg";
import farmersIcon from "../Assets/Images/farmers_icon.svg";
import farmersActiveIcon from "../Assets/Images/engineersActiveIcon.svg";
import aggregationsIcon from "../Assets/Images/aggregations_icon.svg";
import aggregationsActiveIcon from "../Assets/Images/aggregationActiveIcon.svg";
import creditCardIcon from "../Assets/Images/creditcardicon.svg";
import creditCardIconActive from "../Assets/Images/creditcardactiveicon.svg";

import qaadsIcon from "../Assets/Images/qa_ads_icon.svg";
import qaadsActiveIcon from "../Assets/Images/guaranteeActiveIcon.svg";

import warehousesIcon from "../Assets/Images/warehouses_icon.svg";
import warehousesActiveIcon from "../Assets/Images/warehouseActiveIcon.svg";

import financeIcon from "../Assets/Images/finance_icon.svg";
import financeActiveIcon from "../Assets/Images/incomeActiveIcon.svg";

import logisticsIcon from "../Assets/Images/logistics_icon.svg";
import logisticsActiveIcon from "../Assets/Images/logisticsActiveIcon.svg";

import marketplaceIcon from "../Assets/Images/marketplace_icon.svg";
import marketplaceActiveIcon from "../Assets/Images/marketplaceActiveIcon.svg";

import inputIcon from "../Assets/Images/input_icon.svg";
import inputActiveIcon from "../Assets/Images/parcelActiveIcon.svg";

import inventoryIcon from "../Assets/Images/inventory_icon.svg";
import inventoryActiveIcon from "../Assets/Images/inventoryActiveIcon.svg";

import subscription from "../Assets/Images/subscription1.svg";
import subscriptionActiveIcon from "../Assets/Images/subscriptionActive.svg";

import openAds from "../Assets/Images/megaphone2.svg";
import openAdsActiveIcon from "../Assets/Images/megaphone1.svg";

import certificateRequest from "../Assets/Images/certificate.svg";
import certificateRequestActiveIcon from "../Assets/Images/certificateActive.svg";

import truckInformation from "../Assets/Images/truckInformation.svg";
import truckInformationActiveIcon from "../Assets/Images/truckInformationActiveIcon.svg";

import logisticsRequests from "../Assets/Images/logisticsRequests.svg";
import logisticsRequestsActiveIcon from "../Assets/Images/logisticsRequestsActiveIcon.svg";

import transitOrders from "../Assets/Images/transitOrders.svg";
import transitOrdersActiveIcon from "../Assets/Images/transitOrdersActiveIcon.svg";

import trading from "../Assets/Images/trading.svg";
import tradingActiveIcon from "../Assets/Images/tradingActiveIcon.svg";

import financeRequest from "../Assets/Images/financeRequest.svg";
import financeRequestActive from "../Assets/Images/financeRequestActive.svg";

import receivedOrderIcon from "../Assets/Images/receivedOrder.svg";
import receivedOrderActiveIcon from "../Assets/Images/receivedOrderActive.svg";

import reportsIcon from "../Assets/Images/statisticsIcon.svg";
import reportsActiveIcon from "../Assets/Images/statisticsActiveIcon.svg";

import { ROLES } from "../Constant/RoleConstant";

const UserRoleSelectionView = lazy(() =>
  import("../Containers/SignUp/UserRoleSelection/UserRoleSelection")
);
const SignUpPersonalDetailsView = lazy(() =>
  import("../Containers/SignUp/SignUpPersonalDetails/SignUpPersonalDetails")
);
const SignUpAccountDetails = lazy(() =>
  import("../Containers/SignUp/SignUpAccountDetails/SignUpAccountDetails")
);
const KYCVerificationView = lazy(() =>
  import("../Containers/SignUp/KYCVerification/KYCVerification")
);

const DashboardView = lazy(() => import("../Containers/Dashboard/Dashboard"));

const RefereesView = lazy(() =>
  import("../Containers/FarmingAssociation/Referees/Referees")
);
const FarmerDetailsView = lazy(() =>
  import("../Containers/Admin/UserManagement/FarmingAssociation/Farmer/Farmer")
);

const AddFarmerBulkUploadView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Farmers/AddFarmerBulkUpload/AddFarmerBulkUpload"
  )
);

const AdminManagementView = lazy(() =>
  import("../Containers/SuperAdmin/AdminManagement/AdminManagement")
);

const OrderDetailView = lazy(() =>
  import(
    "../Containers/CorporateBuyers/Trading/Orders/OrderDetailView/OrderDetailView"
  )
);

const OrderInputDetailView = lazy(() =>
  import(
    "../Containers/CorporateBuyers/Trading/Orders/OrderDetailView/OrderInputDetailView"
  )
);

const AdminFormView = lazy(() =>
  import("../Containers/SuperAdmin/AdminManagement/AdminForm/AdminForm")
);

const AddRefereesView = lazy(() =>
  import("../Containers/FarmingAssociation/Referees/AddReferees/AddReferees")
);
const FarmerKycVerificationView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Referees/FarmerKYCVerification/FarmerKYCVerification"
  )
);
const FarmersView = lazy(() =>
  import("../Containers/FarmingAssociation/Farmers/Farmers")
);
const AddFarmerOtpVerificationView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Farmers/AddFarmers/AddFarmerOtpVerification/AddFarmerOtpVerification"
  )
);

const AddFarmerVNINVerificationView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Farmers/AddFarmers/AddFarmerOtpVerification/AddFarmerVNINVerification"
  )
);

const CompleteKYCVNINView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Farmers/AddFarmers/AddFarmerOtpVerification/CompleteKYCVNIN/CompleteKYCVNIN"
  )
);

const LandDetailsView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Farmers/AddFarmers/LandDetails/LandDetails"
  )
);

const AddFarmerPersonalDetailsView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Farmers/AddFarmers/AddFarmerPersonalDetails/AddFarmerPersonalDetails"
  )
);

const AddFarmerProductView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Farmers/AddFarmers/AddFarmerProduct/AddFarmerProduct"
  )
);
const AddFarmerRefereeSelectionView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Farmers/AddFarmers/AddFarmerRefereeSelection/AddFarmerRefereeSelection"
  )
);

const AddFarmerKycVerificationView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Farmers/AddFarmers/AddFarmerKycVerification/AddFarmerKycVerification"
  )
);

const AggregationsView = lazy(() =>
  import("../Containers/FarmingAssociation/Aggregation/Aggregation")
);

const AddAggregationView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Aggregation/AddAggregation/AddAggregation"
  )
);

const QaAdsView = lazy(() =>
  import("../Containers/FarmingAssociation/QaAds/QaAds")
);

const CreateAdsView = lazy(() =>
  import("../Containers/FarmingAssociation/QaAds/CreateAds/CreateAds")
);

const QaAdsDetailView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/QaAds/QaAdsDetailView/QaAdsDetailView"
  )
);

const WareHouseView = lazy(() =>
  import("../Containers/FarmingAssociation/WareHouses/WareHouses")
);

const AddWareHouseView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/WareHouses/AddWareHouse/AddWareHouse"
  )
);

const WarehouseDetailView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/WareHouses/WareHousesDetails/WareHousesDetails"
  )
);

const FinanceView = lazy(() =>
  import("../Containers/FarmingAssociation/Finance/Finance")
);

const CreateFinanceRequestView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Finance/CreateRequests/CreateRequests"
  )
);

const FinanceProductDetailView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Finance/FinanceRequestDetail/FinanceRequestDetailView"
  )
);

const LogisticsView = lazy(() =>
  import("../Containers/FarmingAssociation/Logistics/Logistics")
);

const LogisticsAdDetailView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Logistics/LogisticDetails/LogisticDetails"
  )
);
const CreateLogisticAdView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Logistics/CreateLogisticAds/CreateLogisticAds"
  )
);
const MarketplaceView = lazy(() =>
  import("../Containers/FarmingAssociation/Marketplace/Marketplace")
);
const MarketplaceDetailsView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Marketplace/MarketplaceDetail/MarketPlaceDetail"
  )
);

const MarketplaceRecievedOrderDetailsView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Marketplace/MarketplaceRecievedOrderDetail/MarketplaceRecievedOrderDetail"
  )
);

const CreateAdsMarketplaceView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Marketplace/CreateAdsMarketplace/CreateAdsMarketplace"
  )
);
const InputView = lazy(() =>
  import("../Containers/FarmingAssociation/Input/Input")
);
const InputActiveAdsDetailView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Input/InputActiveAdsDetail/InputActiveAdsDetail"
  )
);
const InputOrderDetailView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Input/InputOrderDetail/InputOrderDetail"
  )
);
const InputDetailsView = lazy(() =>
  import("../Containers/FarmingAssociation/Input/InputDetails/InputDetailsView")
);

const InventoryView = lazy(() =>
  import("../Containers/FarmingAssociation/Inventory/Inventory")
);

const BatchDetailView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Inventory/Batches/BatchDetailView/BatchDetailView"
  )
);

const CreateBatchView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Inventory/Batches/CreateBatches/CreateBatches"
  )
);

const ChangePassword = lazy(() =>
  import("../Containers/Profile/ChangePassword/ChangePassword")
);

const ViewProfile = lazy(() =>
  import("../Containers/Profile/ViewProfile/ViewProfile")
);

const ViewSupport = lazy(() =>
  import("../Containers/Profile/ViewSupport/ViewSupport")
);

const AdminEditorView = lazy(() =>
  import("../Containers/SuperAdmin/AdminEditor/AdminEditor")
);

const RefereeDetailsView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/FarmingAssociation/Referee/Referee"
  )
);

const SubscriptionManagementView = lazy(() =>
  import(
    "../Containers/SuperAdmin/SubscriptionManagement/SubscriptionManagement"
  )
);

const CreateSubscriptionPlanView = lazy(() =>
  import(
    "../Containers/SuperAdmin/SubscriptionManagement/CreateSubscriptionPlan/CreateSubscriptionPlan"
  )
);

const MasterManagementView = lazy(() =>
  import("../Containers/Admin/MasterManagement/MasterManagement")
);

const AddItemView = lazy(() =>
  import(
    "../Containers/Admin/MasterManagement/MasterManagementAddItem/MasterManagementAddItem"
  )
);

const ProductMasterView = lazy(() =>
  import("../Containers/Admin/ProductMaster/ProductMaster")
);

const AddProductView = lazy(() =>
  import("../Containers/Admin/ProductMaster/ProductMasterAdd/ProductMasterAdd")
);

const InputMasterView = lazy(() =>
  import("../Containers/Admin/InputMaster/InputMaster")
);
const AddInputView = lazy(() =>
  import("../Containers/Admin/InputMaster/InputMasterAdd/InputMasterAdd")
);

const FarmingAssociationView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/FarmingAssociation/FarmingAssociation"
  )
);

const FarmingAssociationSubscriptionView = lazy(() =>
  import(
    "../Containers/Admin/AssociationSubscription/FarmingAssociationSubscription"
  )
);

const FarmingAddAssociationView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/FarmingAssociation/AddAssociation/AddAssociation"
  )
);

const AssociationDetailView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/FarmingAssociation/AssociationDetails/AssociationDetails"
  )
);

const AggregatorsView = lazy(() =>
  import("../Containers/Admin/UserManagement/Aggregators/Aggregators")
);

const AggregatorDetailView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/Aggregators/AggregatorDetails/AggregatorListingDetails"
  )
);
const InputSupplierView = lazy(() =>
  import("../Containers/Admin/UserManagement/InputSupplier/InputSupplier")
);

const InputSupplierDetailView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/InputSupplier/InputSupplierDetails/InputSupplierDetails"
  )
);

const InputSupplierAddView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/InputSupplier/AddInputSupplier/AddInputSupplier"
  )
);

const CorporateBuyerView = lazy(() =>
  import("../Containers/Admin/UserManagement/CorporateBuyer/CorporateBuyer")
);

const CorporateBuyerDetailView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/CorporateBuyer/CorporateBuyerDetails/CorporateBuyerDetailView"
  )
);

const CorporateBuyerAddView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/CorporateBuyer/AddCorporateBuyer/AddCorporateBuyer"
  )
);

const QACompaniesView = lazy(() =>
  import("../Containers/Admin/UserManagement/QACompanies/QACompanies")
);

const QACompaniesAddView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/QACompanies/AddQACompanies/AddQACompanies"
  )
);
const QACompaniesDetailView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/QACompanies/QACompanyDetails/QACompanyDetails"
  )
);

const AddLogisticsCompanyView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/LogisticCompany/AddLogisticCompany/AddLogisticCompany"
  )
);

const LogisticsCompanyView = lazy(() =>
  import("../Containers/Admin/UserManagement/LogisticCompany/LogisticCompany")
);

const LogisticsCompanyDetailsView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/LogisticCompany/LogisticCompanyDetailsView/LogisticCompanyDetailsView"
  )
);

const FinanceCompanyView = lazy(() =>
  import("../Containers/Admin/UserManagement/FinanceCompany/FinanceCompany")
);

const LogisticCompanyTruckDetailsView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/LogisticCompany/LogisticCompanyTruckDetailsView/LogisticCompanyTruckDetailsView"
  )
);
const FinanceCompanyDetailView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/FinanceCompany/FinanceCompanyDetail/FinanceCompanyDetail"
  )
);
const ManageSupportView = lazy(() =>
  import("../Containers/Admin/ManageSupport/ManageSupport")
);

const FaqsManagementView = lazy(() =>
  import("../Containers/SuperAdmin/FaqsManagement/FaqsManagement")
);

const BlogManagementView = lazy(() =>
  import("../Containers/SuperAdmin/BlogManagement/BlogManagement")
);

const AddBlogView = lazy(() =>
  import("../Containers/SuperAdmin/BlogManagement/AddBlog")
);

const EditBlogView = lazy(() =>
  import("../Containers/SuperAdmin/BlogManagement/EditBlog")
);

const AddAggregatorView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/Aggregators/AddAggregator/AddAggregator"
  )
);

const AddFinanceView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/FinanceCompany/AddFinanceCompany/AddFinanceCompany"
  )
);

const SubscriptionView = lazy(() =>
  import("../Containers/QaCompany/Subscription/Subscription")
);
const SubscriptionDetailsView = lazy(() =>
  import(
    "../Containers/QaCompany/Subscription/SubscriptionDetailsView/SubscriptionDetailsView"
  )
);

const FarmingAssociationSubscriptionDetailsView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Subscription/SubscriptionDetails/SubscriptionDetails"
  )
);

const PaymentStatusView = lazy(() =>
  import("../Components/AjPaymentStatus/AjPaymentStatus")
);

const OpenAdsView = lazy(() => import("../Containers/OpenAds/OpenAds"));

const CertificateRequestsView = lazy(() =>
  import("../Containers/QaCompany/CertificateRequests/CertificateRequests")
);

const TruckInformationView = lazy(() =>
  import("../Containers/LogisticCompany/TruckInformation/TruckInformation")
);

const TruckDetailsView = lazy(() =>
  import(
    "../Containers/LogisticCompany/TruckInformation/TruckDetailsView/TruckDetailsView"
  )
);

const ManageSupportRequestDetailView = lazy(() =>
  import(
    "../Containers/Admin/ManageSupport/ManageSupportRequestDetailView/ManageSupportRequestDetailView"
  )
);

const LogisticsRequestsView = lazy(() =>
  import("../Containers/LogisticCompany/LogisticsRequests/LogisticsRequests")
);

const LogisticsQuotationView = lazy(() =>
  import(
    "../Containers/LogisticCompany/LogisticsRequests/LogisticsQuotation/LogisticsQuotation"
  )
);

const TransitOrdersView = lazy(() =>
  import("../Containers/LogisticCompany/TransitOrders/TransitOrders")
);

const TransitOrderDetailView = lazy(() =>
  import(
    "../Containers/LogisticCompany/TransitOrders/TransitOrderDetail/TransitOrderDetailView"
  )
);

const TradingView = lazy(() =>
  import("../Containers/CorporateBuyers/Trading/Trading")
);

const InputOrderView = lazy(() =>
  import("../Containers/CorporateBuyers/Trading/ProductInputDetail/InputDetail")
);
const ProductOrderView = lazy(() =>
  import(
    "../Containers/CorporateBuyers/Trading/ProductInputDetail/ProductDetail"
  )
);

const BuyerManageLogistics = lazy(() =>
  import("../Containers/CorporateBuyers/ManageLogistics/Logisitcs")
);

const TradingActiveAdDetailsView = lazy(() =>
  import(
    "../Containers/CorporateBuyers/Trading/ActiveAds/TradingActiveAdDetails/TradingActiveAdDetails"
  )
);

const TradingProductDetails = lazy(() =>
  import(
    "../Containers/CorporateBuyers/Trading/TradingProductDetailsView/TradingProductDetailsView"
  )
);

const ReportsView = lazy(() => import("../Containers/Admin/Reports"));

const AggregationInfoView = lazy(() =>
  import(
    ".././Components/AjAggregationInfoViewContainer/AjAggregationInfoViewContainer"
  )
);

const InputReportsViewMoreContainerView = lazy(() =>
  import(
    "../Components/InputReportsViewMoreContainer/InputReportsViewMoreContainer"
  )
);

const InputSoldInfoView = lazy(() =>
  import("../Containers/Admin/AdminReports/InputSold/InputSoldListingView")
);

const AddTruckView = lazy(() =>
  import("../Containers/LogisticCompany/TruckInformation/AddTruck/AddTruck")
);

const AddFaqView = lazy(() =>
  import("../Containers/SuperAdmin/FaqsManagement/AddFaq")
);

const EditFaqView = lazy(() =>
  import("../Containers/SuperAdmin/FaqsManagement/EditFaq")
);

const TermsAndCondition = lazy(() =>
  import("../Containers/TncAndPrivacyPolicy/TncAndPrivacyPolicy")
);

const SingleBuyerView = lazy(() =>
  import("../Containers/Admin/UserManagement/SingleBuyer/SingleBuyer")
);

const SingleBuyerAddView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/SingleBuyer/AddSingleBuyer/AddSingleBuyer"
  )
);

const SingleBuyerDetailView = lazy(() =>
  import(
    "../Containers/Admin/UserManagement/SingleBuyer/SingleBuyerDetails/SingleBuyerDetails"
  )
);

const FinanceRequestsView = lazy(() =>
  import("../Containers/FinanceCompany/FinanceRequests/FinanceRequests")
);

const FinanceCompanyRequestDetailView = lazy(() =>
  import(
    "../Containers/FinanceCompany/FinanceRequestCompanyDetailView/FinanceCompanyRequestDetailView"
  )
);

const AdditionalDetailsRequestedView = lazy(() =>
  import(
    "../Containers/FinanceCompany/AdditionalDetailsRequested/AdditionalDetailsRequested"
  )
);
const InputInventoryView = lazy(() =>
  import("../Containers/InputSupplier/InputInventory/InputInventory")
);

const InputInventoryEditView = lazy(() =>
  import(
    "../Containers/InputSupplier/InputInventory/EditInventory/EditInventory"
  )
);

const InputSupplierReceivedOrdersView = lazy(() =>
  import(
    "../Containers/InputSupplier/InputSupplierReceivedOrders/InputSupplierReceivedOrders"
  )
);
const FinanceFarmerDetailView = lazy(() =>
  import("../Containers/Admin/UserManagement/FarmingAssociation/Farmer/Farmer")
);

const HarvestInfoView = lazy(() =>
  import("../Containers/FinanceCompany/HarvestInformation/HarvestInformation")
);

const AdminFinanceRequestsView = lazy(() =>
  import("../Containers/Admin/FinanceRequests/FinanceRequestsView")
);

const RevenuePaymentsView = lazy(() =>
  import("../Containers/Admin/RevenuePayments/RevenuePayments")
);

const ProductOrderQAView = lazy(() =>
  import("../Containers/QaCompany/ProductOrderQA/ProductOrderQa")
);

const ProductOrderQAReportView = lazy(() =>
  import(
    "../Containers/QaCompany/ProductOrderQA/ProductOrderReportUpload/ProductOrderReportUpload"
  )
);

const SellerWalletsView = lazy(() =>
  import("../Containers/FarmingAssociation/Wallets/SellerWallet")
);

const BuyerWalletsView = lazy(() =>
  import("../Containers/CorporateBuyers/Wallets/BuyerWallet")
);

const AdminProductOrderQaView = lazy(() =>
  import("../Containers/Admin/ProductOrderQaAdmin/ProductOrderQaAdmin")
);

const AdminProductOrderQaViewDetails = lazy(() =>
  import(
    "../Containers/Admin/ProductOrderQaAdmin/ProductOrderQaAdminDetails/ProductOrderQaAdminDetails"
  )
);
const AdminBankManagementView = lazy(() =>
  import(
    "../Containers/Admin/BankManagement/FarmingAssociationBankManagement/BankManagement"
  )
);

const AdminBankCardRequestView = lazy(() =>
  import("../Containers/Admin/BankCardRequest/BankCardRequest/BankCardRequest")
);

const FarmerSubscriptionView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Subscriptions/SubscriptionDashboard/SubscriptionDashboard"
  )
);

const FarmerSubscriptionDetailsView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Subscriptions/SubscriptionDashboard/SubscriptionDetailsTab/SubscriptionDetailTab"
  )
);

const FarmerSubscriptionControlView = lazy(() =>
  import(
    "../Containers/FarmingAssociation/Subscriptions/SelectSubscriptions/SelectedSubDashboard"
  )
);

const RetailMarketView = lazy(() =>
  import("../Containers/RetailMarket/RetailMarket/RetailMarket")
);
const RetailMarketCreateAdView = lazy(() =>
  import(
    "../Containers/RetailMarket/RetailMarketCreateAds/RetailMarketCreateAds"
  )
);
const RetailMarketActiveAdDetailsView = lazy(() =>
  import("../Containers/RetailMarket/ActiveAdsDetail/ActiveAdsDetail")
);
const RetailMarketRecievedOrderDetailsView = lazy(() =>
  import("../Containers/RetailMarket/REcievedOrder/RecievedOrder")
);
const RetailMarketEditAdView = lazy(() =>
  import("../Containers/RetailMarket/ActiveAdsEdit/ActiveAdsEdit")
);

const userRole = getUserData()?.role_id;

export const privateRoutes = [
  {
    path: '/',
    component: <DashboardView />,
    isLayoutNeeded: true,
    name: "Home",
    rolesAllowed: [
      ROLES.FARMING_ASSOCIATION,
      ROLES.ADMIN,
      ROLES.SUPER_ADMIN,
      ROLES.PRODUCT_AGGREGATOR,
      ROLES.INPUT_SUPPLIER,
      ROLES.SINGLE_SELLER,
    ],
    renderOnSidebar: true,
    icon: dashboardIcon,
    activeIcon: dashboardActiveIcon,
  },

  
  {
    path: USERROLESELECTION,
    component: <UserRoleSelectionView />,
    isLayoutNeeded: false,
    name: "User Role Selection",
    rolesAllowed: [],
    renderOnSidebar: false,
  },

  {
    path: SIGNUPPERSONALDETAILS,
    component: <SignUpPersonalDetailsView />,
    isLayoutNeeded: false,
    name: "SignUp Personal Details",
    rolesAllowed: [],
    renderOnSidebar: false,
  },

  {
    path: SIGNUPACCOUNTDETAILS,
    component: <SignUpAccountDetails />,
    isLayoutNeeded: false,
    name: "SignUp Account Details",
    rolesAllowed: [],
    renderOnSidebar: false,
  },

  {
    path: KYCVERIFICATION,
    component: <KYCVerificationView />,
    isLayoutNeeded: false,
    name: "KYC Verification",
    rolesAllowed: [],
    renderOnSidebar: false,
  },

  {
    path: PROFILEFARMINGASSOCIATION,
    component: <ProfileFarmingAssociation />,
    isLayoutNeeded: true,
    name: "Profile Farming Association",
    rolesAllowed: [],
    renderOnSidebar: false,
  },

  {
    path: DASHBOARD,
    component: <DashboardView />,
    isLayoutNeeded: true,
    name: "Dashboard",
    rolesAllowed: [
      ROLES.FARMING_ASSOCIATION,
      ROLES.ADMIN,
      ROLES.SUPER_ADMIN,
      ROLES.PRODUCT_AGGREGATOR,
      ROLES.INPUT_SUPPLIER,
      ROLES.SINGLE_SELLER,
    ],
    renderOnSidebar: true,
    icon: dashboardIcon,
    activeIcon: dashboardActiveIcon,
  },

  {
    path: REFEREES,
    isLayoutNeeded: true,
    name: "Referees",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION],
    renderOnSidebar: true,
    icon: refereesIcon,
    activeIcon: refereesActiveIcon,
    children: [
      {
        path: "",
        component: <RefereesView />,
      },
      {
        path: ADD_REFEREES,
        component: <AddRefereesView />,
      },
      {
        path: FARMER_KYC_VERIFICATION,
        component: <FarmerKycVerificationView />,
      },
    ],
  },
  {
    path: FARMERS,
    isLayoutNeeded: true,
    name: "Farmers",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION],
    renderOnSidebar: true,
    icon: farmersIcon,
    activeIcon: farmersActiveIcon,
    children: [
      {
        path: "",
        component: <FarmersView />,
      },
      {
        path: FARMERS_DETAIL,
        children: [
          {
            path: "",
            component: <FarmerDetailsView />,
          },
          {
            path: COMPLETE_KYC_VNIN,
            component: <CompleteKYCVNINView />,
          },
        ],
      },
      {
        path: FARMERS_EDIT,
        component: <FarmerDetailsView />,
      },
      {
        path: FARMERS_BULK_UPLOAD,
        component: <AddFarmerBulkUploadView />,
      },
    ],
  },
  {
    path: ADD_FARMER_OTP_VERIFICATION,
    isLayoutNeeded: true,
    component: <AddFarmerOtpVerificationView />,
    name: "AddFarmerOtpVerification",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION],
    renderOnSidebar: false,
  },
  {
    path: ADD_FARMER_VNIN_VERIFICATION,
    isLayoutNeeded: true,
    component: <AddFarmerVNINVerificationView />,
    name: "AddFarmerVNINVerification",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION],
    renderOnSidebar: false,
  },
  {
    path: ADD_FARMERS_LAND_DETAILS,
    component: <LandDetailsView />,
    isLayoutNeeded: true,
    name: "Farmer Land Details",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION],
    renderOnSidebar: false,
  },
  {
    path: ADD_FARMER_PERSONAL_DETAILS,
    isLayoutNeeded: true,
    component: <AddFarmerPersonalDetailsView />,
    name: "AddFarmerOtpVerification",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION],
    renderOnSidebar: false,
  },
  {
    path: ADD_FARMER_PRODUCT,
    isLayoutNeeded: true,
    component: <AddFarmerProductView />,
    name: "AddFarmerOtpVerification",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION],
    renderOnSidebar: false,
  },
  {
    path: ADD_FARMER_REFEREE_SELECTION,
    isLayoutNeeded: true,
    component: <AddFarmerRefereeSelectionView />,
    name: "AddFarmerRefereeSelection",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION],
    renderOnSidebar: false,
  },
  {
    path: ADD_FARMER_KYC_VERIFICATION,
    isLayoutNeeded: true,
    component: <AddFarmerKycVerificationView />,
    name: "AddFarmerRefereeSelection",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION],
    renderOnSidebar: false,
  },
  {
    path: AGGREGATIONS,
    isLayoutNeeded: true,
    name: "Aggregations",
    rolesAllowed: [
      ROLES.FARMING_ASSOCIATION,
      ROLES.PRODUCT_AGGREGATOR,
      ROLES.INPUT_SUPPLIER,
    ],
    renderOnSidebar: true,
    icon: aggregationsIcon,
    activeIcon: aggregationsActiveIcon,
    children: [
      {
        path: "",
        component: <AggregationsView />,
      },
      {
        path: ADD_AGGREGATION,
        component: <AddAggregationView />,
      },
    ],
  },
  {
    path: QAADS,
    isLayoutNeeded: true,
    name: "QA ads",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION, ROLES.PRODUCT_AGGREGATOR],
    renderOnSidebar: true,
    icon: qaadsIcon,
    activeIcon: qaadsActiveIcon,
    children: [
      {
        path: "",
        component: <QaAdsView />,
      },
      {
        path: CREATE_ADS,
        component: <CreateAdsView />,
      },
      {
        path: QA_ADS_DETAIL,
        component: <QaAdsDetailView />,
      },
    ],
  },
  {
    path: WAREHOUSES,
    isLayoutNeeded: true,
    name: "Warehouses",
    rolesAllowed: [
      ROLES.FARMING_ASSOCIATION,
      ROLES.PRODUCT_AGGREGATOR,
      ROLES.INPUT_SUPPLIER,
    ],
    renderOnSidebar: true,
    icon: warehousesIcon,
    activeIcon: warehousesActiveIcon,
    children: [
      {
        path: "",
        component: <WareHouseView />,
      },
      {
        path: ADD_WAREHOUSE,
        component: <AddWareHouseView />,
      },
      {
        path: WAREHOUSE_DETAIL,
        component: <WarehouseDetailView />,
      },
      {
        path: WAREHOUSE_EDIT,
        component: <WarehouseDetailView />,
      },
    ],
  },
  {
    path: FINANCE,
    isLayoutNeeded: true,
    name: "Finance",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION],
    renderOnSidebar: true,
    icon: financeIcon,
    activeIcon: financeActiveIcon,
    children: [
      {
        path: "",
        component: <FinanceView />,
      },
      {
        path: CREATE_FINANCE_REQUEST,
        component: <CreateFinanceRequestView />,
      },
      {
        path: FINANCE__PRODUCT_REQUEST_DETAIL,
        component: <FinanceProductDetailView />,
      },
    ],
  },
  {
    path: TRADING,
    isLayoutNeeded: true,
    name: "Trading",
    rolesAllowed: [
      ROLES.CORPORATE_BUYER,
      ROLES.SINGLE_BUYER,
      ROLES.PRODUCT_AGGREGATOR,
    ],
    renderOnSidebar: true,
    icon: trading,
    activeIcon: tradingActiveIcon,
    children: [
      {
        path: "",
        component: <TradingView />,
      },
      {
      },
      {
        path: TRADING_PRODUCT_DETAILS,
        component: <TradingProductDetails />,
      },
      {
        path: TRADING_ORDER_DEATILS,
        component: <TradingActiveAdDetailsView />,
      },
    ],
  },
  {
    path: BUYER_WALLET,
    isLayoutNeeded: true,
    name: "Wallet",
    rolesAllowed: [ROLES.SINGLE_BUYER, ROLES.CORPORATE_BUYER],
    renderOnSidebar: true,
    icon: creditCardIcon,
    activeIcon: creditCardIconActive,
    children: [{ path: "", component: <BuyerWalletsView /> }],
  },
  {
    path: LOGISTICS,
    isLayoutNeeded: true,
    name: "Logistics",
    rolesAllowed: [
      ROLES.FARMING_ASSOCIATION,
      ROLES.PRODUCT_AGGREGATOR,
      ROLES.INPUT_SUPPLIER,
      ROLES.CORPORATE_BUYER,
    ],
    renderOnSidebar: true,
    icon: logisticsIcon,
    activeIcon: logisticsActiveIcon,
    children: [
      {
        path: "",
        component: <LogisticsView />,
      },
      {
        path: LOGISTICS_AD_DETAIL,
        component: <LogisticsAdDetailView />,
      },
      {
        path: LOGISTICS_CREATE_AD,
        component: <CreateLogisticAdView />,
      },
    ],
  },
  {
    path: MARKETPLACE,
    isLayoutNeeded: true,
    name: "Marketplace",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION, ROLES.PRODUCT_AGGREGATOR],
    renderOnSidebar: true,
    icon: marketplaceIcon,
    activeIcon: marketplaceActiveIcon,
    children: [
      {
        path: "",
        component: <MarketplaceView />,
      },
      {
        path: CREATE_ADS_MARKETPLACE,
        component: <CreateAdsMarketplaceView />,
      },
      {
        path: CREATE_ADS_MARKETPLACE_BY_ID,
        component: <CreateAdsMarketplaceView />,
      },
      {
        path: ACTIVE_ADS_MARKETPLACE_DETAIL,
        component: <MarketplaceDetailsView />,
      },
      {
        path: ACTIVE_ADS_MARKETPLACE_EDIT,
        component: <MarketplaceDetailsView />,
      },
      {
        path: RECIEVED_ORDER_MARKETPLACE_DETAIL,
        component: <MarketplaceRecievedOrderDetailsView />,
      },
    ],
  },
  {
    path: RETAILMARKET,
    isLayoutNeeded: true,
    name: "Retail Market",
    rolesAllowed: [ROLES.PRODUCT_AGGREGATOR],
    renderOnSidebar: true,
    icon: marketplaceIcon,
    activeIcon: marketplaceActiveIcon,
    children: [
      {
        path: "",
        component: <RetailMarketView />,
      },
      {
        path: RETAILMARKET_CREATEADS,
        component: <RetailMarketCreateAdView />,
      },
      {
        path: RETAILMARKET_ADDETAIL,
        component: <RetailMarketActiveAdDetailsView />,
      },
      {
        path: RETAILMARKETADS_EDIT,
        component: <RetailMarketEditAdView />,
      },
      {
        path: RETAILMARKET_RECIEVEDORDERS_DETAIL,
        component: <RetailMarketRecievedOrderDetailsView />,
      },
    ],
  },
  {
    path: INPUT,
    isLayoutNeeded: true,
    name: "Input",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION],
    renderOnSidebar: true,
    icon: inputIcon,
    activeIcon: inputActiveIcon,
    children: [
      { path: "", component: <InputView /> },
      {
        path: INPUT_ACTIVE_ADS_DETAIL,
        component: <InputActiveAdsDetailView />,
      },
      {
        path: INPUT_ORDER_DETAIL,
        component: <InputOrderDetailView />,
      },
      { path: ORDER_DETAIL_INPUT, component: <InputDetailsView /> },
    ],
  },
  {
    path: INVENTORY,
    isLayoutNeeded: true,
    name: "Inventory",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION, ROLES.PRODUCT_AGGREGATOR],
    renderOnSidebar: true,
    icon: inventoryIcon,
    activeIcon: inventoryActiveIcon,
    children: [
      {
        path: "",
        component: <InventoryView />,
      },
      {
        path: CREATE_BATCHES,
        component: <CreateBatchView />,
      },
      { path: BATCH_DETAIL, component: <BatchDetailView /> },
    ],
  },
  {
    path: INPUT_INVENTROY,
    isLayoutNeeded: true,
    name: "Inventory",
    rolesAllowed: [ROLES.INPUT_SUPPLIER],
    renderOnSidebar: true,
    icon: inventoryIcon,
    activeIcon: inventoryActiveIcon,
    children: [
      {
        path: "",
        component: <InputInventoryView />,
      },
      {
        path: INPUT_INVENTROY_EDIT,
        component: <InputInventoryEditView />,
      },
    ],
  },
  {
    path: CHANGEPASSWORD,
    component: <ChangePassword />,
    isLayoutNeeded: true,
    name: "Change Password",
    rolesAllowed: [],
    renderOnSidebar: false,
  },
  {
    path: VIEWPROFILE,
    component: <ViewProfile />,
    isLayoutNeeded: true,
    name: "My Profile",
    rolesAllowed: [
      ROLES.FARMING_ASSOCIATION,
      ROLES.PRODUCT_AGGREGATOR,
      ROLES.QA_COMPANY,
      ROLES.LOGISTICS_COMPANY,
      ROLES.SINGLE_BUYER,
      ROLES.CORPORATE_BUYER,
      ROLES.FARMER,
      ROLES.FINANCE_COMPANY,
      ROLES.INPUT_SUPPLIER,
      ROLES.SUPER_ADMIN,
    ],

    renderOnSidebar: false,
    icon: inventoryIcon,
  },
  {
    path: VIEWSUPPORT,
    component: <ViewSupport />,
    isLayoutNeeded: true,
    name: "Support",
    rolesAllowed: [],
    renderOnSidebar: false,
    icon: inventoryIcon,
  },
  {
    path: SUBSCRIPTION_MANAGEMENT,
    isLayoutNeeded: true,
    name: "Subscription Management",
    rolesAllowed: [ROLES.SUPER_ADMIN],
    renderOnSidebar: true,
    children: [
      { path: "", component: <SubscriptionManagementView /> },
      {
        path: CREATE_SUBSCRIPTION_PLAN,
        component: <CreateSubscriptionPlanView />,
      },
    ],
  },

  {
    path: MASTER_MANAGEMENT,
    isLayoutNeeded: true,
    name: "Master Management",
    rolesAllowed: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    renderOnSidebar: true,
    children: [
      { path: "", component: <MasterManagementView /> },
      {
        path: ADD_ITEMS,
        component: <AddItemView />,
      },
      {
        path: EDIT_ITEMS,
        component: <AddItemView />,
      },
    ],
  },
  {
    path: PRODUCT_MASTER,
    isLayoutNeeded: true,
    name: "Product Master",
    rolesAllowed: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    renderOnSidebar: true,
    children: [
      { path: "", component: <ProductMasterView /> },
      {
        path: ADD_PRODUCT,
        component: <AddProductView />,
      },
      {
        path: EDIT_PRODUCT,
        component: <AddProductView />,
      },
    ],
  },
  {
    path: INPUT_MASTER,
    isLayoutNeeded: true,
    name: "Input Master",
    rolesAllowed: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    renderOnSidebar: true,
    children: [
      { path: "", component: <InputMasterView /> },
      {
        path: ADD_INPUT,
        component: <AddInputView />,
      },
      {
        path: EDIT_INPUT,
        component: <AddInputView />,
      },
    ],
  },

  {
    path: ADMIN_PRODUCT_ORDER_QA,
    isLayoutNeeded: true,
    name: "Product Orders",
    rolesAllowed: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    renderOnSidebar: true,
    children: [
      {
        path: "",
        component: <AdminProductOrderQaView />,
      },
      {
        path: ADMIN_PRODUCT_ORDER_QA_DETAIL,
        component: <AdminProductOrderQaViewDetails />,
      },
    ],
  },
  {
    path: BANK_MANAGEMENT,
    isLayoutNeeded: true,
    component: <AdminBankManagementView />,
    name: "Manage Bank",
    rolesAllowed: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    renderOnSidebar: true,
  },

  {
    path: BANK_CARD_REQUEST,
    isLayoutNeeded: true,
    component: <AdminBankCardRequestView />,
    name: "Bank Card Request",
    rolesAllowed: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    renderOnSidebar: true,
  },

  {
    path: ADMIN_USER_MANAGEMENT,
    isLayoutNeeded: true,
    name: "User Management",
    rolesAllowed: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    renderOnSidebar: true,
    children: [
      {
        name: "Farming Associations",
        path: ADMIN_FARMING_ASSOCIATION,
        renderChildrenOnSidebar: true,
        children: [
          {
            path: "",
            component: <FarmingAssociationView />,
          },
          {
            path: ADMIN_EDIT_FARMING_ASSOCIATION,
            component: <AssociationDetailView />,
          },
          {
            path: ADMIN_DETAIL_FARMING_ASSOCIATION,
            component: <AssociationDetailView />,
          },
          {
            path: ADMIN_ADD_FARMING_ASSOCIATION,
            component: <FarmingAddAssociationView />,
          },
          {
            path: ADMIN_EDIT_REFEREE,
            component: <RefereeDetailsView />,
          },
          {
            path: ADMIN_DETAIL_REFEREE,
            component: <RefereeDetailsView />,
          },
          {
            path: ADMIN_EDIT_FARMER,
            component: <FarmerDetailsView />,
          },

          {
            path: ADMIN_DETAIL_FARMER,
            component: <FarmerDetailsView />,
          },
        ],
      },
      {
        name: "Aggregators",
        path: ADMIN_AGGREGATORS,
        renderChildrenOnSidebar: true,
        children: [
          {
            path: "",
            component: <AggregatorsView />,
          },
          {
            path: ADMIN_EDIT_AGGREGATOR,
            component: <AggregatorDetailView />,
          },
          {
            path: ADMIN_DETAIL_AGGREGATOR,
            component: <AggregatorDetailView />,
          },
          {
            path: ADMIN_ADD_AGGREGATOR,
            component: <AddAggregatorView />,
          },
        ],
      },
      {
        name: "Input Supplier",
        path: ADMIN_INPUT_SUPPLIER,
        renderChildrenOnSidebar: true,
        children: [
          {
            path: "",
            component: <InputSupplierView />,
          },
          {
            path: ADMIN_INPUT_SUPPLIER_ADD,
            component: <InputSupplierAddView />,
          },
          {
            path: ADMIN_INPUT_SUPPLIER_DETAIL,
            component: <InputSupplierDetailView />,
          },
          {
            path: ADMIN_INPUT_SUPPLIER_EDIT,
            component: <InputSupplierDetailView />,
          },
        ],
      },

      {
        name: "Corporate Buyers",
        path: ADMIN_CORPORATE_BUYER,
        renderChildrenOnSidebar: true,
        children: [
          {
            path: "",
            component: <CorporateBuyerView />,
          },
          {
            path: ADMIN_CORPORATE_BUYER_DETAIL,
            component: <CorporateBuyerDetailView />,
          },
          {
            path: ADMIN_EDIT_CORPORATE_BUYER,
            component: <CorporateBuyerDetailView />,
          },
          {
            path: ADMIN_ADD_CORPORATE_BUYER,
            component: <CorporateBuyerAddView />,
          },
        ],
      },
      // {
      //   name: "Single Buyer",
      //   path: ADMIN_SINGLE_BUYER,
      //   renderChildrenOnSidebar: true,
      //   children: [
      //     {
      //       path: "",
      //       component: <SingleBuyerView />,
      //     },
      //     {
      //       path: ADMIN_ADD_SINGLE_BUYER,
      //       component: <SingleBuyerAddView />,
      //     },
      //     {
      //       path: ADMIN_SINGLE_BUYER_DETAIL,
      //       component: <SingleBuyerDetailView />,
      //     },
      //     {
      //       path: ADMIN_SINGLE_BUYER_EDIT,
      //       component: <SingleBuyerDetailView />,
      //     },
      //   ],
      // },
      {
        name: "Finance Companies",
        path: ADMIN_FINANCE,
        renderChildrenOnSidebar: true,
        children: [
          { path: "", component: <FinanceCompanyView /> },
          {
            path: ADMIN_ADD_FINANCE,
            component: <AddFinanceView />,
          },
          {
            path: ADMIN_FINANCE_COMPANY_DETAIL,
            component: <FinanceCompanyDetailView />,
          },
          {
            path: ADMIN_FINANCE_COMPANY_EDIT,
            component: <FinanceCompanyDetailView />,
          },
        ],
      },
      {
        name: "QA Companies",
        path: ADMIN_QA_COMPANIES,
        renderChildrenOnSidebar: true,
        children: [
          {
            path: "",
            component: <QACompaniesView />,
          },
          {
            path: ADMIN_ADD_QA_COMPANIES,
            component: <QACompaniesAddView />,
          },
          {
            path: ADMIN_DETAIL_QA_COMPANIES,
            component: <QACompaniesDetailView />,
          },
          {
            path: ADMIN_EDIT_QA_COMPANIES,
            component: <QACompaniesDetailView />,
          },
        ],
      },
      {
        name: "Logistics Companies",
        path: ADMIN_LOGISTICS,
        renderChildrenOnSidebar: true,
        children: [
          {
            path: "",
            component: <LogisticsCompanyView />,
          },
          {
            path: ADMIN_ADD_LOGISTICS,
            component: <AddLogisticsCompanyView />,
          },
          {
            path: ADMIN_DETAIL_LOGISTICS,
            component: <LogisticsCompanyDetailsView />,
          },
          {
            path: ADMIN_EDIT_LOGISTICS,
            component: <LogisticsCompanyDetailsView />,
          },

          {
            path: ADMIN_DETAIL_TRUCK,
            component: <LogisticCompanyTruckDetailsView />,
          },
          {
            path: ADMIN_EDIT_TRUCK,
            component: <LogisticCompanyTruckDetailsView />,
          },
        ],
      },
    ],
  },

  {
    path: ADMIN_FARMER_ASSOCIATION_SUBSCRIPTION,
    isLayoutNeeded: true,
    name: "Association Subscription",
    rolesAllowed: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    renderOnSidebar: true,
    children: [
      {
        path: ADMIN_FARMER_ASSOCIATION_SUBSCRIPTION,
        component: <FarmingAssociationSubscriptionView />,
      },
    ],
  },

  {
    path: ADMIN_MANAGEMENT,
    isLayoutNeeded: true,
    name: "Admin Management",
    rolesAllowed: [ROLES.SUPER_ADMIN],
    renderOnSidebar: true,
    children: [
      {
        path: "",
        component: <AdminManagementView />,
      },
      {
        path: ADD_ADMIN,
        component: <AdminFormView />,
      },
      {
        path: EDIT_ADMIN,
        component: <AdminFormView />,
      },
    ],
  },

  {
    path: ADD_PRIVACY_POLICY,
    component: <AdminEditorView />,
    isLayoutNeeded: true,
    name: "Manage Privacy Policy",
    rolesAllowed: [ROLES.SUPER_ADMIN],
    renderOnSidebar: true,
  },

  {
    path: TERMS_AND_CONDITIONS_MANAGEMENT,
    component: <AdminEditorView />,
    isLayoutNeeded: true,
    name: "Manage T&C",
    rolesAllowed: [ROLES.SUPER_ADMIN],
    renderOnSidebar: true,
  },
  {
    path: MANAGE_SUPPORT,
    component: <ManageSupportView />,
    isLayoutNeeded: true,
    name: "Manage Support",
    rolesAllowed: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    renderOnSidebar: true,
    children: [
      {
        path: "",
        component: <ManageSupportView />,
      },
      {
        path: SUPPORT_REQUEST_DETAIL_VIEW,
        component: <ManageSupportRequestDetailView />,
      },
    ],
  },
  {
    path: BLOG_MANAGEMENT,
    isLayoutNeeded: true,
    name: "Blog Management",
    rolesAllowed: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    renderOnSidebar: true,
    children: [
      {
        path: "",
        component: <BlogManagementView />,
      },
      {
        path: BLOG_MANAGEMENT_ADD,
        component: <AddBlogView />,
      },
      {
        path: BLOG_MANAGEMENT_EDIT,
        component: <EditBlogView />,
      },
    ],
  },
  {
    path: FAQS_MANAGEMENT,
    isLayoutNeeded: true,
    name: "FAQs Management",
    rolesAllowed: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    renderOnSidebar: true,
    children: [
      {
        path: "",
        component: <FaqsManagementView />,
      },
      {
        path: FAQS_MANAGEMENT_ADD,
        component: <AddFaqView />,
      },
      {
        path: FAQS_MANAGEMENT_EDIT,
        component: <EditFaqView />,
      },
    ],
  },

  {
    path: REPORTS,
    isLayoutNeeded: true,
    name: "Reports",
    icon: reportsIcon,
    activeIcon: reportsActiveIcon,
    rolesAllowed: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.FARMING_ASSOCIATION,
      ROLES.PRODUCT_AGGREGATOR,
      ROLES.INPUT_SUPPLIER,
    ],
    renderOnSidebar: true,
    children: [
      {
        path: "",
        component: <ReportsView />,
      },
      {
        path: PRODUCT_SOLD_VIEW_MORE,
        component: <AggregationInfoView path={PRODUCT_SOLD_VIEW_MORE} />,
      },
      {
        path: PRODUCT_AGGREGATION_VIEW_MORE,
        component: <AggregationInfoView path={PRODUCT_AGGREGATION_VIEW_MORE} />,
      },
      {
        path: INPUT_PURCHASED_VIEW_MORE,
        component: <InputReportsViewMoreContainerView />,
      },
      {
        path: INPUT_SOLD_INFO,
        component: <InputSoldInfoView />,
      },
    ],
  },
  {
    path: SELLER_WALLET,
    isLayoutNeeded: true,
    name: "Wallet",
    rolesAllowed: [
      ROLES.FARMING_ASSOCIATION,
      ROLES.INPUT_SUPPLIER,
      ROLES.PRODUCT_AGGREGATOR,
    ],
    renderOnSidebar: userRole !== ROLES.FARMING_ASSOCIATION ? true : false,
    icon: creditCardIcon,
    activeIcon: creditCardIconActive,
    children: [{ path: "", component: <SellerWalletsView /> }],
  },

  {
    path: FARMER_SUBSCRIPTION,
    isLayoutNeeded: true,
    name: "Subscriptions",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION],
    renderOnSidebar: true,
    icon: subscription,
    activeIcon: subscriptionActiveIcon,
    children: [
      {
        path: "",
        component: <FarmerSubscriptionView />,
      },
      {
        path: FARMER_SUBSCRIPTION_DETAIL,
        component: <FarmerSubscriptionDetailsView />,
      },
      {
        path: FARMER_SUBSCRIPTION_CONTROL,
        component: <FarmerSubscriptionControlView />,
      },
    ],
  },
  {
    path: TRUCK_INFORMATION,
    isLayoutNeeded: true,
    name: "Truck Information",
    rolesAllowed: [ROLES.LOGISTICS_COMPANY],
    renderOnSidebar: true,
    icon: truckInformation,
    activeIcon: truckInformationActiveIcon,
    children: [
      {
        path: "",
        component: <TruckInformationView />,
      },
      {
        path: TRUCK_DETAILS,
        component: <TruckDetailsView />,
      },
      {
        path: ADD_TRUCKS,
        component: <AddTruckView />,
      },
    ],
  },
  {
    path: SUBSCRIPTION,
    isLayoutNeeded: true,
    name: "Subscription",
    rolesAllowed: [ROLES.QA_COMPANY, ROLES.LOGISTICS_COMPANY],
    renderOnSidebar: true,
    icon: subscription,
    activeIcon: subscriptionActiveIcon,
    children: [
      {
        path: "",
        component: <SubscriptionView />,
      },
      {
        path: SUBSCRIPTION_DETAILS,
        component: <SubscriptionDetailsView />,
      },
    ],
  },
  {
    path: FA_SUBSCRIPTION,
    isLayoutNeeded: true,
    name: "Subscription",
    rolesAllowed: [ROLES.FARMING_ASSOCIATION],
    renderOnSidebar: false,
    icon: subscription,
    activeIcon: subscriptionActiveIcon,
    children: [
      {
        path: FARMING_ASSOCIATION_SUBSCRIPTION_DETAILS,
        component: <FarmingAssociationSubscriptionDetailsView />,
      },
    ],
  },
  {
    path: PAYMENT_PURCHASE_SUBSCRIPTION,
    component: <PaymentStatusView />,
    isLayoutNeeded: false,
    name: "Payment Purchase Subscription",
    rolesAllowed: [
      ROLES.QA_COMPANY,
      ROLES.LOGISTICS_COMPANY,
      ROLES.CORPORATE_BUYER,
      ROLES.SINGLE_BUYER,
      ROLES.FARMING_ASSOCIATION,
    ],
    renderOnSidebar: false,
  },
  {
    path: OPEN_ADS,
    isLayoutNeeded: true,
    name: "Open Ads",
    rolesAllowed: [ROLES.QA_COMPANY, ROLES.LOGISTICS_COMPANY],
    renderOnSidebar: true,
    icon: openAds,
    activeIcon: openAdsActiveIcon,
    children: [
      {
        path: "",
        component: <OpenAdsView />,
      },
      {
        path: LOGISTICSQUOTAION,
        component: <LogisticsQuotationView />,
      },
    ],
  },
  {
    path: CERTIFICATE_REQUESTS,
    component: <CertificateRequestsView />,
    isLayoutNeeded: true,
    name: "Certificate requests",
    rolesAllowed: [ROLES.QA_COMPANY],
    renderOnSidebar: true,
    icon: certificateRequest,
    activeIcon: certificateRequestActiveIcon,
  },
  {
    path: PRODUCT_ORDER_QA,
    isLayoutNeeded: true,
    name: "Product Orders",
    rolesAllowed: [ROLES.QA_COMPANY],
    renderOnSidebar: true,
    icon: receivedOrderIcon,
    activeIcon: receivedOrderActiveIcon,

    children: [
      {
        path: "",
        component: <ProductOrderQAView />,
      },
      {
        path: PRODUCT_ORDER_QA_UPLOAD_REPORT,
        component: <ProductOrderQAReportView />,
      },
    ],
  },
  {
    path: LOGISTICS_REQUESTS,
    component: <LogisticsRequestsView />,
    isLayoutNeeded: true,
    name: "Logistics Requests",
    rolesAllowed: [ROLES.LOGISTICS_COMPANY],
    renderOnSidebar: true,
    icon: logisticsRequests,
    activeIcon: logisticsRequestsActiveIcon,
  },
  {
    path: TRANSIT_ORDERS,
    component: <TransitOrdersView />,
    isLayoutNeeded: true,
    name: "Transit Orders",
    rolesAllowed: [ROLES.LOGISTICS_COMPANY],
    renderOnSidebar: true,
    icon: transitOrders,
    activeIcon: transitOrdersActiveIcon,
    children: [
      {
        path: "",
        component: <TransitOrdersView />,
      },
      {
        path: TRANSIT_ORDER_DETAIL_VIEW,
        component: <TransitOrderDetailView />,
      },
    ],
  },
  {
    path: FINANCE_REQUESTS,
    component: <FinanceRequestsView />,
    isLayoutNeeded: true,
    name: "Finance Requests",
    rolesAllowed: [ROLES.FINANCE_COMPANY],
    renderOnSidebar: true,
    icon: financeRequest,
    activeIcon: financeRequestActive,
    children: [
      {
        path: "",
        component: <FinanceRequestsView />,
      },
      {
        path: FINANCE_REQUEST_DETAIL_VIEW,
        component: <FinanceCompanyRequestDetailView />,
      },
      {
        path: FINANCE_ADDITIONAL_DETAIL_VIEW,
        component: <AdditionalDetailsRequestedView />,
      },
      {
        path: FINANCE_FARMER_DETAIL_VIEW,
        component: <FinanceFarmerDetailView />,
      },
    ],
  },

  {
    path: TERMS_AND_CONDITIONS,
    component: <TermsAndCondition />,
    isLayoutNeeded: false,
    name: "TermsAndCondition",
    rolesAllowed: [],
    renderOnSidebar: false,
    icon: inventoryIcon,
  },

  {
    path: PRIVACY_POLICY,
    component: <TermsAndCondition />,
    isLayoutNeeded: false,
    name: "PrivacyPolicy",
    rolesAllowed: [],
    renderOnSidebar: false,
    icon: inventoryIcon,
  },
  {
    path: INPUT_SUPPLIER_RECEIVED_ORDERS,
    isLayoutNeeded: true,
    name: "Received Orders",
    rolesAllowed: [ROLES.INPUT_SUPPLIER],
    renderOnSidebar: true,
    icon: receivedOrderIcon,
    activeIcon: receivedOrderActiveIcon,
    children: [
      {
        path: "",
        component: <InputSupplierReceivedOrdersView />,
      },
      {
        path: INPUT_SUPPLIER_RECEIVED_ORDERS_DETAIL,
        component: <MarketplaceRecievedOrderDetailsView />,
      },
    ],
  },

  {
    path: ADMIN_FINANCE_REQUESTS,
    component: <AdminFinanceRequestsView />,
    isLayoutNeeded: true,
    name: "Finance Requests",
    rolesAllowed: [ROLES.SUPER_ADMIN],
    renderOnSidebar: true,
  },

  {
    path: HARVEST_INFORMATION,
    component: <HarvestInfoView />,
    isLayoutNeeded: true,
    name: "Harvest",
    rolesAllowed: [ROLES.FINANCE_COMPANY],
    renderOnSidebar: false,
    icon: inventoryIcon,
  },
  {
    path: ADMIN_REVENUE_PAYMENTS,
    component: <RevenuePaymentsView />,
    isLayoutNeeded: true,
    name: "Revenue & Payments",
    rolesAllowed: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    renderOnSidebar: true,
  },
];

const getPrivateRoutes = () => {
  const userData = getUserData();
  if (userData) {
    const roleId = userData?.role_id;
    const routes = privateRoutes.filter((route) => {
      return (
        route.rolesAllowed.includes(roleId) || route.rolesAllowed.length < 1
      );
    });
    return routes;
  } else {
    return [];
  }
};

export default getPrivateRoutes;
