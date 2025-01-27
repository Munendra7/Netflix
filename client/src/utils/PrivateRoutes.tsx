import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from '../app/store';

const PrivateRoutes = () => {

  const {user, isloading} = useSelector((state:RootState) => state.user.value);

  if(isloading) return <p>Loading...</p>;
  return user ? (<Outlet />) : <Navigate to="/login" />;
};

export default PrivateRoutes;