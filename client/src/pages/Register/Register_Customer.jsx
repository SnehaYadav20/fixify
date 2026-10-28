import "./Register.css";
import register from "../../images/register.png";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {useAuth } from "../../store/auth"
import { toast } from "react-toastify";

const Register_Customer = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
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
      const response = await fetch(`http://localhost:5000/api/auth/registerC`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data=await response.json();
      if (response.ok) {
        
        storeTokenInLS(res_data.token);
        setUser({ name: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");
        navigate("/loginC");
      } 
      else{
       toast.error(res_data.extraDetails? res_data.extraDetails:res_data.message)
      }
    } catch (error) {
      console.log("Register", error);
    }
  };


        // Log user data to console


  return (
    <>
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image">
              <img
                src={register}
                alt="a girl is trying to do registration"
                width="500"
                height="500"
              />
            </div>
            <div className="registration-form">
              <h1 className="main-heading mb-3">Customer Registration Form</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    id="name"
                    required
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInput}
                  />
                </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="phone"
                      id="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInput} 
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
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
                  <button type="submit">
                    Register
                  </button>
                  <p><Link to="/loginC" className='ms-2'>Already a user Login Here!</Link></p>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Register_Customer;
