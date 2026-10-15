import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import ChooseUser from "./pages/ChooseUser/ChooseUser";
import ContentPage from "./pages/Content/ContentPage";
import MaintenanceGate from "./components/Public/MaintenanceGate/MaintenanceGate";
import RequireAuth from "./components/Auth/RequireAuth";

import CustomerLogin from "./pages/Customer/Auth/CustomerLogin";
import CustomerRegister from "./pages/Customer/Auth/CustomerRegister";
import CustomerJoin from "./pages/Customer/Join/CustomerJoin";
import CustomerVerify from "./pages/Customer/Auth/CustomerVerify";
import CustomerHome from "./pages/Customer/Home/CustomerHome";
import CustomerPackage from "./pages/Customer/Package/CustomerPackage";
import AdditionalPackages from "./pages/Customer/Package/AdditionalPackages";
import CustomerWallet from "./pages/Customer/Wallet/CustomerWallet";
import CustomerOffers from "./pages/Customer/Offers/CustomerOffers";
import CustomerNotifications from "./pages/Customer/Notifications/CustomerNotifications";
import CustomerProfile from "./pages/Customer/Profile/CustomerProfile";
import MaintenanceRequest from "./pages/Customer/Maintenance/MaintenanceRequest";
import MaintenanceTracking from "./pages/Customer/Maintenance/MaintenanceTracking";
import ChangePackage from "./pages/Customer/Package/ChangePackage";
import RenewPackage from "./pages/Customer/Package/RenewPackage";

import MerchantLogin from "./pages/Merchant/Auth/MerchantLogin";
import MerchantRegister from "./pages/Merchant/Auth/MerchantRegister";
import MerchantPending from "./pages/Merchant/Auth/MerchantPending";

const App = () => {
  return (
    <MaintenanceGate>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<CustomerJoin />} />
        <Route path="/choose-user" element={<ChooseUser />} />
        <Route path="/content/:key" element={<ContentPage />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/verify" element={<CustomerVerify />} />
        <Route element={<RequireAuth />}>
          <Route path="/customer/home" element={<CustomerHome />} />
          <Route path="/customer/package" element={<CustomerPackage />} />
          <Route path="/customer/packages" element={<ChangePackage />} />
          <Route
            path="/customer/additional-packages"
            element={<AdditionalPackages />}
          />
          <Route path="/customer/package/renew" element={<RenewPackage />} />
          <Route path="/customer/wallet" element={<CustomerWallet />} />
          <Route path="/customer/offers" element={<CustomerOffers />} />
          <Route
            path="/customer/notifications"
            element={<CustomerNotifications />}
          />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route
            path="/customer/maintenance"
            element={<MaintenanceRequest />}
          />
          <Route
            path="/customer/maintenance/tracking"
            element={<MaintenanceTracking />}
          />
        </Route>
        <Route path="/merchant/login" element={<MerchantLogin />} />
        <Route path="/merchant/register" element={<MerchantRegister />} />
        <Route path="/merchant/pending" element={<MerchantPending />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MaintenanceGate>
  );
};

export default App;
