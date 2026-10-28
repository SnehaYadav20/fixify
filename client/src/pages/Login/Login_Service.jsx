import "./Login.css";
import login from '../../images/login.png';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Make sure to import Link
import {useAuth } from "../../store/auth"
import { toast } from "react-toastify";

const Login_Service = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate=useNavigate();
  const {storeTokenInLS}=useAuth();
  

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/loginS`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data=await response.json();
      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({ email: "" , password: "" });
        toast.success("Login successful");
        navigate("/")
        
      } 
      else{
        toast.error(res_data.extraDetails? res_data.extraDetails:res_data.message)
        console.log("Invalid Credentials")
      }
    } catch (error) {
      console.log("Login ", error);
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            {/* let's tackle registration form  */}
            <div className="registration-form">
              <h1 className="main-heading mb-3">Service Provider Customer Login Form</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="enter your email"
                    id="email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
                <br />
                <button type="submit">Login</button>
                <p><Link to="/registerC" className='ms-2'>Not a user Register Here!</Link></p>
              </form>
            </div>
            <div className="registration-image">
              <img
                src={login}
                alt=" let's fill the login form "
                width="500"
                height="500"
              />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Login_Service;
