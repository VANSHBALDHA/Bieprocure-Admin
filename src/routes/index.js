import React from "react";

// For No Route Match
import PageNotFound from "../pages/Utility/pages-404";

// Profile
import UserProfile from "../pages/Authentication/user-profile";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

// Sub Admin Users
import SubAdminUsers from "../pages/MyPages/ManageAdminUsers/ManageAdminUsers";

// Manage Master Management
import Brand from "../pages/MyPages/ManageMaster/Brand";
import Categories from "../pages/MyPages/ManageMaster/Categories";
import DisplayName from "../pages/MyPages/ManageMaster/DisplayName";
import Certificate from "../pages/MyPages/ManageMaster/Certificate";
import SubCategories from "../pages/MyPages/ManageMaster/SubCategories";
import SubSubCategories from "../pages/MyPages/ManageMaster/Sub-SubCategories";

// Media Upload
import MediaUpload from "../pages/MyPages/MediaUpload/MediaUpload";

// Manage Products
import ManageProduct from "../pages/MyPages/ManageProduct/ManageProduct";
import AddProduct from "../pages/MyPages/ManageProduct/AddProduct";
import EditProduct from "../pages/MyPages/ManageProduct/EditProduct";

// Manage Inventory
import Display from "../pages/MyPages/ManageInventory/Display";
import Sales from "../pages/MyPages/ManageInventory/Sales";
import Reserved from "../pages/MyPages/ManageInventory/Reserved";

// Manage Customers
import Corporate from "../pages/MyPages/ManageCustomers/Corporate";
import Individual from "../pages/MyPages/ManageCustomers/Individual";

// Manage Tickets
import ManageTicket from "../pages/MyPages/ManageTicket/ManageTicket";

// Manage Contents
import Banner from "../pages/MyPages/ManageContents/Banner";
import Legal from "../pages/MyPages/ManageContents/Legal";

// Generate Reports
import GenerateReports from "../pages/MyPages/GenerateReports/GenerateReports";

// Site Settings
import Setting from "../pages/MyPages/Settings/Setting";
import Quote from "../pages/MyPages/ManageRequests/Quote";
import Bom from "../pages/MyPages/ManageRequests/Bom";
import Contact from "../pages/MyPages/ManageRequests/Contact";
import NewProduct from "../pages/MyPages/ManageRequests/NewProduct";
import ManageFeatures from "../pages/MyPages/ManageFeatures/ManageFeatures";
import OrderList from "../pages/MyPages/OrderList.js/OrderList";
import FeatureList from "../pages/MyPages/ManageProduct/FeatureList";
import Invoice from "../pages/MyPages/InvoiceList/Invoice";
import InvoiceDetails from "../pages/MyPages/InvoiceList/InvoiceDetails";
import UserQuoteList from "../pages/MyPages/QuoteListing/UserQuoteList";
import UserCartList from "../pages/MyPages/UserCartList/UserCartList";
import ViewProductModel from "../pages/MyPages/ManageProduct/ViewProduct";
import IndividualCart from "../pages/MyPages/ManageRequests/Cart/IndividualCart";
import CorporateCart from "../pages/MyPages/ManageRequests/Cart/CorporateCart";
import IndividualUserCartList from "../pages/MyPages/ManageRequests/Cart/IndividualUserCartList";
import CorporateUserCartList from "../pages/MyPages/ManageRequests/Cart/CorporateUserCartList";
import IndividualOrder from "../pages/MyPages/ManageOrders/IndividualOrder";
import CorporateOrder from "../pages/MyPages/ManageOrders/CorporateOrder";
import ViewCorporateOrder from "../pages/MyPages/ManageOrders/ViewCorporateOrder";
import ViewIndividualOrder from "../pages/MyPages/ManageOrders/ViewIndividualOrder";
import Blog from "../pages/MyPages/ManageContents/Blog/Blog";
import ViewBlog from "../pages/MyPages/ManageContents/Blog/ViewBlog";
import AddBlog from "../pages/MyPages/ManageContents/Blog/AddBlog";
import EditBlog from "../pages/MyPages/ManageContents/Blog/EditBlog";
import IndividualDetail from "../pages/MyPages/ManageCustomers/IndividualDetail";
import CorporateDetail from "../pages/MyPages/ManageCustomers/CorporateDetail";
import ReservedView from "../pages/MyPages/ManageInventory/ReservedView";

const authProtectedRoutes = [
  { path: "/", exact: true, component: <Dashboard /> },

  // //profile
  { path: "/profile", component: <UserProfile /> },

  // Manage Sub Admin User
  { path: "/manage-sub-admin-users", component: <SubAdminUsers /> },

  // Manage Master Management
  { path: "/manage-master/display-name", component: <DisplayName /> },
  { path: "/manage-master/certificate", component: <Certificate /> },
  { path: "/manage-master/brand", component: <Brand /> },
  { path: "/manage-master/categories", component: <Categories /> },
  { path: "/manage-master/sub-categories", component: <SubCategories /> },
  {
    path: "/manage-master/sub-sub-categories",
    component: <SubSubCategories />,
  },
  {
    path: "/manage-master/sub-sub-categories/:id",
    component: <ManageFeatures />,
  },

  // Media Uploads
  { path: "/media-upload", component: <MediaUpload /> },

  // Manage Products
  { path: "/manage-products", component: <ManageProduct /> },
  { path: "/manage-products/add-product", component: <AddProduct /> },
  { path: "/manage-products/edit-product/:id", component: <EditProduct /> },
  {
    path: "/manage-products/view-product/:id",
    component: <ViewProductModel />,
  },
  { path: "/manage-products/feature-list/:id", component: <FeatureList /> },

  // Manage Inventory
  { path: "/manage-inventory/display", component: <Display /> },
  { path: "/manage-inventory/reserved", component: <Reserved /> },
  {
    path: "/manage-inventory/reserved/view-details/:id",
    component: <ReservedView />,
  },
  { path: "/manage-inventory/sales", component: <Sales /> },
  { path: "/manage-inventory/sales/orders/:id", component: <OrderList /> },
  { path: "/manage-inventory/sales/invoices/:id", component: <Invoice /> },
  {
    path: "/manage-inventory/sales/invoices/:id/invoice-details/:id",
    component: <InvoiceDetails />,
  },

  // Manage Customers
  { path: "/manage-customers/individual", component: <Individual /> },
  {
    path: "/manage-customers/individual/customer-details/:id",
    component: <IndividualDetail />,
  },
  { path: "/manage-customers/corporate", component: <Corporate /> },
  {
    path: "/manage-customers/corporate/customer-details/:id",
    component: <CorporateDetail />,
  },

  // Manage Requests
  {
    path: "/manage-request/cart/individual-customers",
    component: <IndividualCart />,
  },
  {
    path: "/manage-request/cart/individual-customers/cart-list/:id",
    component: <IndividualUserCartList />,
  },

  {
    path: "/manage-request/cart/corporate-customers",
    component: <CorporateCart />,
  },
  {
    path: "/manage-request/cart/corporate-customers/cart-list/:id",
    component: <CorporateUserCartList />,
  },

  {
    path: "/manage-request/cart/individual-customers/cart-list/:id",
    component: <UserCartList />,
  },
  { path: "/manage-request/quote", component: <Quote /> },
  {
    path: "/manage-request/quote/customre-quote-list/:id",
    component: <UserQuoteList />,
  },
  { path: "/manage-request/bom", component: <Bom /> },
  { path: "/manage-request/new-product", component: <NewProduct /> },
  { path: "/manage-request/contact", component: <Contact /> },

  // Manage Ticket
  { path: "/manage-ticket", component: <ManageTicket /> },

  // Manage Contents
  { path: "/manage-contents/blogs", component: <Blog /> },
  { path: "/manage-contents/blogs/add-blog", component: <AddBlog /> },
  { path: "/manage-contents/blogs/edit-blog/:id", component: <EditBlog /> },
  { path: "/manage-contents/blogs/view-blog/:id", component: <ViewBlog /> },
  { path: "/manage-contents/banner", component: <Banner /> },
  { path: "/manage-contents/legal", component: <Legal /> },

  // Manage Contents
  { path: "/manage-orders/corporate-customer", component: <CorporateOrder /> },
  {
    path: "/manage-orders/corporate-customer/order-details/:id",
    component: <ViewCorporateOrder />,
  },

  {
    path: "/manage-orders/individual-customer",
    component: <IndividualOrder />,
  },
  {
    path: "/manage-orders/individual-customer/order-details/:id",
    component: <ViewIndividualOrder />,
  },

  // Generate Reports
  { path: "/generate-reports", component: <GenerateReports /> },

  // Settings
  { path: "/settings", component: <Setting /> },
];

const publicRoutes = [
  { path: "*", component: <PageNotFound /> },

  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
