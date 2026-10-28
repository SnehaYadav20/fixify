import "./Register.css";
import register from"../../images/register.png"
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {useAuth } from "../../store/auth"
import { toast } from "react-toastify";

const Register_ServiceProvider = () => {
  const [provider, setProvider] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    aadhar: "", // New field for Aadhar number
    jobType: "" // New field for job type selection
  });

  const navigate=useNavigate();

  const {storeTokenInLS}=useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProvider({
      ...provider,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(provider);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/registerS`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(provider),
      });
      const res_data=await response.json();
      if (response.ok) {
        // Reset the form fields
        storeTokenInLS(res_data.token);
        setProvider({ 
          name: "", 
          email: "", 
          phone: "", 
          password: "", 
          aadhar: "", 
          jobType: "" 
        });
        toast.success("Registration successful");
        navigate("/loginS");
      } 
      else{
        toast.error(res_data.extraDetails? res_data.extraDetails:res_data.message)
      }
    } catch (error) {
      console.log("register ", error);
    }
  };
    

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

              {/* let tackle registration form  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Service Provider Registration Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name">name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      id="name"
                      required
                      autoComplete="off"
                      value={provider.name}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={provider.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="phone"
                      id="phone"
                      required
                      autoComplete="off"
                      value={provider.phone}
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
                      value={provider.password}
                      onChange={handleInput}
                    />
                    <label htmlFor="aadhar">Aadhar Number</label>
                    <input
                      type="text"
                      name="aadhar"
                      placeholder="Enter your Aadhar Number"
                      id="aadhar"
                      required
                      autoComplete="off"
                      value={provider.aadhar}
                      onChange={handleInput}
                    />
                    <label htmlFor="jobType" >Job Type</label>
                    <select
                      name="jobType"
                      id="jobType"
                      value={provider.jobType}
                      onChange={handleInput}
                      required={true}
                    >
                        <option value="">Select Job Type</option>
                        <option value="plumber">Plumber</option>
                        <option value="electrician">Electrician</option>
                        <option value="hvacTechnician">HVAC Technician</option>
                        <option value="carpenter">Carpenter</option>
                        <option value="painter">Painter</option>
                        <option value="handyman">Handyman</option>
                        <option value="landscaper">Landscaper</option>
                        <option value="applianceRepair">Appliance Repair Technician</option>
                        <option value="locksmith">Locksmith</option>
                        <option value="roofingContractor">Roofing Contractor</option>
                        <option value="pestControl">Pest Control Specialist</option>
                        <option value="securitySystemInstaller">Home Security System Installer</option>
                        <option value="windowDoorInstaller">Window and Door Installer/Repairer</option>
                        <option value="flooringSpecialist">Flooring Specialist</option>
                        <option value="poolMaintenanceTechnician">Pool Maintenance Technician</option>
                        <option value="gutterCleanerInstaller">Gutter Cleaner/Installer</option>
                        <option value="homeInspector">Home Inspector</option>
                        <option value="garageDoorSpecialist">Garage Door Specialist</option>
                        <option value="fenceInstallerRepairer">Fence Installer/Repairer</option>
                        <option value="interiorDesigner">Interior Designer</option>
                        <option value="windowCleaner">Window Cleaner</option>
                        <option value="carpetCleaner">Carpet Cleaner</option>
                        <option value="mover">Mover</option>
                        <option value="exterminator">Exterminator</option>
                        <option value="interiorDecorator">Interior Decorator</option>
                        <option value="homeOrganizer">Home Organizer</option>
                        <option value="homeTheaterInstaller">Home Theater Installer</option>
                        <option value="solarPanelInstaller">Solar Panel Installer</option>
                        <option value="smartHomeInstaller">Smart Home Installer</option>
                        <option value="pressureWasher">Pressure Washer</option>
                        <option value="generatorInstaller">Generator Installer</option>
                        <option value="fireplaceInstaller">Fireplace Installer</option>
                        <option value="awningsBlindsInstaller">Awnings/Blinds Installer</option>
                        <option value="bbqGrillInstaller">BBQ Grill Installer</option>
                        <option value="flooringInstaller">Flooring Installer</option>
                        <option value="cabinetInstaller">Cabinet Installer</option>
                        <option value="countertopInstaller">Countertop Installer</option>
                        <option value="homeInspector">Home Inspector</option>
                        <option value="propertyManager">Property Manager</option>
                        <option value="realEstateAgent">Real Estate Agent</option>
                        <option value="homeSecurityConsultant">Home Security Consultant</option>
                        <option value="insuranceAgent">Insurance Agent</option>
                      {/* Add more options as needed */}
                    </select>

                  </div>

                  <br />
                  <button type="submit">Register</button>
                  <p><Link to="/loginS" className='ms-2'>Already a user Login Here!</Link></p>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Register_ServiceProvider;
