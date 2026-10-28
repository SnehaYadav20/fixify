import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

const AdminUpdateS = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    aadhar: "", 
    jobType: "" 
  });

  const params = useParams();
  console.log("params single user: ", params);
  const { authorizationToken } = useAuth();

  //   get single user data
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/userS/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`users single data:  ${data}`);
      setData(data);

      //   if (response.ok) {
      //     getAllUsersData();
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  // to udpate the data dynamically
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
       `http://localhost:5000/api/admin/userS/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Updated successfully");
      } else {
        toast.error("Not Updated ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update Service Provider Data</h1>
      </div>
      {/* contact page main  */}
      <div className="container grid grid-two-cols">
        {/* contact form content actual  */}
        <section className="section-form">
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
                      value={data.name}
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
                      value={data.email}
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
                      value={data.phone}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    
                    <label htmlFor="aadhar">Aadhar Number</label>
                    <input
                      type="text"
                      name="aadhar"
                      placeholder="Enter your Aadhar Number"
                      id="aadhar"
                      required
                      autoComplete="off"
                      value={data.aadhar}
                      onChange={handleInput}
                    />
                    <label htmlFor="jobType" >Job Type</label>
                    <select
                      name="jobType"
                      id="jobType"
                      value={data.jobType}
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


            <div>
              <button type="submit">Update</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default AdminUpdateS