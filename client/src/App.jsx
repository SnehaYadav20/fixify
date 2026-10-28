import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Services from './pages/Services/Services';
import Error from "./pages/Error/Error";
import Sign from './pages/Sign/sign';
import Login_Customer from './pages/Login/Login_Customer';
import Register_Customer from './pages/Register/Register_Customer';
import Login_Service from './pages/Login/Login_Service';
import Register_ServiceProvider from './pages/Register/Register_ServiceProvider';
import Logout from './pages/Logout/Logout';
import AdminLayout from "./components/Layouts/AdminLayout";
import AdminCustomer from "./pages/Admin/Admin-Customer";
import AdminServiceProvider from "./pages/Admin/Admin-ServiceProvider";
import AdminContacts from "./pages/Admin/Admin-Contacts";
import AdminUpdateC from "./pages/Admin/Admin-UpdateC";
import AdminUpdateS from "./pages/Admin/Admin-UpdateS";
// New real-version pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Bookings from './pages/Bookings/Bookings';
import BookingDetail from './pages/Bookings/BookingDetail';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/Sign' element={<Sign />} />
        <Route path='/contact' element={<Contact />} />
        {/* unified auth (recommended) */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* bookings: the real core */}
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/bookings/:id' element={<BookingDetail />} />
        {/* legacy logins kept */}
        <Route path='/registerC' element={<Register_Customer />} />
        <Route path='/registerS' element={<Register_ServiceProvider />} />
        <Route path='/loginC' element={<Login_Customer />} />
        <Route path='/loginS' element={<Login_Service />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route path="customer" element={<AdminCustomer />} />
          <Route path="serviceprovider" element={<AdminServiceProvider />} />
          <Route path="userC/:id/edit" element={<AdminUpdateC />} />
          <Route path="userS/:id/edit" element={<AdminUpdateS />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
