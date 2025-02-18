import React from 'react';
import ContactForm from './components/ContactForm';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
const App = () => {
  return (   
      <Router> 
        <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Go to Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ContactForm />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
