import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CustomerForm.css";

const CustomerForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleNext = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!name || !phoneNumber) {
      alert("Please enter customer details.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/customer", { name, phoneNumber });
      console.log("Saved customer:", response.data);
      localStorage.setItem("customer", JSON.stringify(response.data)); // Save response
      navigate("/product"); // Navigate to product selection
    } catch (error) {
      alert("Error saving customer.");
    }
  };

  return (
    <div className="customer-container">
      <div className="customer-header">
        <h1 className="welcome-message">Enter Customer Details</h1>
        <p className="sub-text">Fast, secure, and efficient billing for your retail shop.</p>
      </div>
      <form className="customer-form" onSubmit={handleNext}>
        <input className="customer-input" type="text" placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="customer-input" type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <button type="submit" className="customer-button">Proceed to Products</button>
      </form>
    </div>
  );
};

export default CustomerForm;
