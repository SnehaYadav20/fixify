import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("contact data: ", data);
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // defining the funciton deleteContactById

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getContactsData();
        toast.success("Deleted successfully");
      } else {
        toast.error("Not Deleted ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
      <section className="admin-contacts-section">
        <h1>Admin Contact Data </h1>

        <div className="container  admin-users">
          {contactData.map((curContactData, index) => {
            const { name, email, query, _id } = curContactData;

            return (
              <div key={index} className="card-details">
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Query: {query}</p>
                <button className="btn" onClick={() => deleteContactById(_id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AdminContacts