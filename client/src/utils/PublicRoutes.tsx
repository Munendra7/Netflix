import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from '../app/store';

const PublicRoutes = () => {

  const {user, isloading} = useSelector((state:RootState) => state.user.value);

  if(isloading) return <p>Loading...</p>;
  return user ? (<Navigate to="/browse" />) : <Outlet />;
};

export default PublicRoutes;