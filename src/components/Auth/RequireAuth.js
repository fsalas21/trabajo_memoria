import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log('Auth', auth);

    return (
        auth?.code
            ? <Outlet />
            : <Navigate to='/signin-code' state={{ from: location }} replace />
    );
};

export default RequireAuth;