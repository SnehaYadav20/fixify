import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {
  const {user,isLoading}=useAuth()

  if(isLoading){
    return <h1>LOADING.........</h1>
  }

  if(!user || (user.role !== "admin" && !user.isAdmin)){
    return <Navigate to="/"/>
  }
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
            <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/customer">
                  <FaUser /> Customers
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/serviceprovider">
                  <FaUser /> Service Provider
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage /> Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/services">
                  <FaRegListAlt /> Services
                </NavLink>
              </li>

              
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
export default AdminLayout