import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../store/auth";
import { FaUser, FaHome, FaRegListAlt, FaUserSecret, FaReadme, FaQuora } from "react-icons/fa";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const isAdmin = isLoggedIn && user && user.isAdmin;

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">Fixify</NavLink>
          </div>
          <nav>
            <ul>
              <li><NavLink to="/"><FaHome />Home</NavLink></li>
              <li><NavLink to="/about"><FaReadme />About</NavLink></li>
              <li><NavLink to="/services"><FaRegListAlt />Services</NavLink></li>
              <li><NavLink to="/contact"><FaQuora />Contact</NavLink></li>
              {isLoggedIn && (
                <li><NavLink to="/bookings">Bookings</NavLink></li>
              )}
              {isAdmin && (
                <li><NavLink to="/admin/customer"><FaUserSecret />Admin</NavLink></li>
              )}
              {isLoggedIn ? (
                <li><NavLink to="/logout"><FaUser />Logout{user?.name ? ` (${user.name.split(" ")[0]})` : ""}</NavLink></li>
              ) : (
                <>
                  <li><NavLink to="/login">Login</NavLink></li>
                  <li><NavLink to="/register"><FaUser />Sign Up</NavLink></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
