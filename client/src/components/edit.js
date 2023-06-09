import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   Name: "",
   Email: "",
   Phone: "",
   Msg: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     Name: form.Name,
     Email: form.Email,
     Phone: form.Phone,
     Msg: form.Msg,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5050/record/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="Name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="Name"
           value={form.Name}
           onChange={(e) => updateForm({ Name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="Email">Email: </label>
         <input
           type="text"
           className="form-control"
           id="Email"
           value={form.Email}
           onChange={(e) => updateForm({ Email: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="Phone">Phone: </label>
         <input
           type="text"
           className="form-control"
           id="Phone"
           value={form.Phone}
           onChange={(e) => updateForm({ Phone: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="Msg">Message : </label>
         <input
           type="text"
           className="form-control"
           id="Msg"
           value={form.Msg}
           onChange={(e) => updateForm({ Msg: e.target.value })}
         />
       </div>

       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}