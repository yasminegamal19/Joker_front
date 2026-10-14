import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UNAUTHORIZED_EVENT, isAuthenticated } from "../../lib/auth";

// بيحمي كل صفحات العميل: من غير توكن → تسجيل الدخول.
// ولو أي API رجّع 401 وإحنا جوه الصفحة، بنرجّع العميل لتسجيل الدخول برضه.
const RequireAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onUnauthorized = () =>
      navigate("/customer/login", { replace: true, state: { expired: true } });

    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
  }, [navigate]);

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/customer/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default RequireAuth;
