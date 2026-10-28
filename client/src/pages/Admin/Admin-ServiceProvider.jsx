import { useEffect,useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminServiceProvider=()=>{
    const{authorizationToken}=useAuth();
    const [users,setUsers]=useState([])

    const getAllServiceProviderData=async()=>{
        try {
            const response=await fetch("http://localhost:5000/api/admin/userS",{
                method: "GET",
                headers:{
                    Authorization:authorizationToken 
                }

            })
            const data=await response.json();
            console.log(`ServiceProvider: ${data}`)
            setUsers(data);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/userS/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        });
        const data = await response.json();
        console.log(`users after delete:  ${data}`);
  
        if (response.ok) {
          getAllServiceProviderData();
          toast.success("Customer Deleted Successfully")
        }
        else{
          toast.error("Some Error Occurred")
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(()=>{
        getAllServiceProviderData();
    },[])
    return<>
    <section className="admin-users-section">
        <div className="container">
          <h1>Admin Service Provider Data </h1>
        </div>
        <div className="container  admin-users">
          <table className="table2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Aadhar</th>
                <th>JobType</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.name}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.aadhar}</td>
                    <td>{curUser.jobType}</td>
                    <td>{curUser.phone}</td>
                    <td><Link to={`/admin/userS/${curUser._id}/edit`}>Edit</Link></td>
                    <td><button className="btn" onClick={() => deleteUser(curUser._id)}> Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>

}

export default AdminServiceProvider