import React, { useEffect, useState } from "react";
import '../App.css';
const Dashboard = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Message</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id}>
              <td>{msg.username}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
              <td>{new Date(msg.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
