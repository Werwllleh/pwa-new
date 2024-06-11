import {Navigate, Outlet} from "react-router-dom";
import {useUserStore} from "../store/user-store";

const RequiredAuth = () => {
  const [isAuthenticated] = useUserStore((state) => [state.isAuthenticated])

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default RequiredAuth;