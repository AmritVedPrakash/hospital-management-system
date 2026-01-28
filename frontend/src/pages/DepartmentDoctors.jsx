import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../main";
import { toast } from "react-toastify";

const DepartmentDoctors = () => {
  const { departmentName } = useParams();
  const navigate = useNavigate();        // ✅ hook at top
  const { isAuthenticated } = useContext(Context);

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://hospital-management-system-dkxp.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );

        const filteredDoctors = data.doctors.filter(
          (doc) => doc.doctorDepartment === departmentName
        );

        setDoctors(filteredDoctors);
      } catch (error) {
        console.log("Error fetching doctors", error);
      }
    };

    fetchDoctors();
  }, [departmentName]);

  const handleGetAppointment = (doctorId) => {
    if (!isAuthenticated) {
      toast.error("Please login to book an appointment.");
      return;
    }

    navigate(`/appointment/${doctorId}`);
  };

  return (
    <div className="container department-doctors">
      <h2>{departmentName} Doctors</h2>

      {doctors.length > 0 ? (
        <div className="doctors-grid">
          {doctors.map((doc) => (
            <div className="doctor-card" key={doc._id}>
              <img
                src={doc.docAvatar?.url || "/default-doctor.png"}
                alt="Doctor"
                className="doctor-img"
              />

              <h4>{doc.firstName} {doc.lastName}</h4>

              <p><strong>Email:</strong> {doc.email}</p>
              <p><strong>Mobile:</strong> {doc.phone}</p>
              <p><strong>DOB:</strong> {doc.dob?.substring(0, 10)}</p>
              <p><strong>NIC:</strong> {doc.nic}</p>
              <p><strong>Gender:</strong> {doc.gender}</p>
              <p><strong>Department:</strong> {doc.doctorDepartment}</p>

              <button
                className="appointment-btn"
                onClick={() => handleGetAppointment(doc._id)}
              >
                Get Appointment
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h3>No doctors found for this department.</h3>
      )}
    </div>
  );
};

export default DepartmentDoctors;
