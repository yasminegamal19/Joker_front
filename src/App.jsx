import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import ChooseUser from "./pages/ChooseUser/ChooseUser";

import CustomerLogin from "./pages/Customer/Auth/CustomerLogin";
import CustomerRegister from "./pages/Customer/Auth/CustomerRegister";
import CustomerVerify from "./pages/Customer/Auth/CustomerVerify";
import CustomerHome from "./pages/Customer/Home/CustomerHome";
import CustomerWallet from "./pages/Customer/Wallet/CustomerWallet";
import CustomerOffers from "./pages/Customer/Offers/CustomerOffers";
import CustomerNotifications from "./pages/Customer/Notifications/CustomerNotifications";
import CustomerProfile from "./pages/Customer/Profile/CustomerProfile";
import MaintenanceRequest from "./pages/Customer/Maintenance/MaintenanceRequest";
import MaintenanceTracking from "./pages/Customer/Maintenance/MaintenanceTracking";

import MerchantLogin from "./pages/Merchant/Auth/MerchantLogin";
import MerchantRegister from "./pages/Merchant/Auth/MerchantRegister";
import MerchantPending from "./pages/Merchant/Auth/MerchantPending";

const App = () => {
  return (
    <Routes>
      {/* Public Website */}
      <Route path="/" element={<Home />} />
      <Route path="/choose-user" element={<ChooseUser />} />

      {/* Customer */}
      <Route path="/customer/login" element={<CustomerLogin />} />
      <Route path="/customer/register" element={<CustomerRegister />} />
      <Route path="/customer/verify" element={<CustomerVerify />} />
      <Route path="/customer/home" element={<CustomerHome />} />
      <Route path="/customer/wallet" element={<CustomerWallet />} />
      <Route path="/customer/offers" element={<CustomerOffers />} />
      <Route
        path="/customer/notifications"
        element={<CustomerNotifications />}
      />
      <Route path="/customer/profile" element={<CustomerProfile />} />
      <Route path="/customer/maintenance" element={<MaintenanceRequest />} />
      <Route
        path="/customer/maintenance/tracking"
        element={<MaintenanceTracking />}
      />

      {/* Merchant */}
      <Route path="/merchant/login" element={<MerchantLogin />} />
      <Route path="/merchant/register" element={<MerchantRegister />} />
      <Route path="/merchant/pending" element={<MerchantPending />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
