import React, { useState } from "react";
import '../App.css';

const ContactForm = () => {
const [formData, setFormData] = useState({ username: "", email: "", message: "" });
const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if(formData.username.trim() && formData.username.length < 3) tempErrors.username = "Username must be at least 3 characters";
    if (!formData.username.trim()) tempErrors.username = "Username is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:5000/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          setFormData({ username: "", email: "", message: "" });
        } else {
          alert(data.error);
        }
      } catch (error) {
        alert("Error submitting form");
      }
    }
  };
  
  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <h2>Create a Message</h2>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
      {errors.username && <span className="error">{errors.username}</span>}

      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      {errors.email && <span className="error">{errors.email}</span>}

      <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange}></textarea>
      {errors.message && <span className="error">{errors.message}</span>}

      <button type="submit">Submit</button>
    </form>
  </div>
  );
}

export default ContactForm;
