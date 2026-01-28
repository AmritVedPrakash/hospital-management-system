import React, { useContext,useEffect } from 'react';
import { Context } from './main';
import './App.css';
import{BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import About from './pages/AboutUS';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import axios from 'axios';
import Footer from './components/Footer';
import DepartmentDoctors from "./pages/DepartmentDoctors";

const App = () => {
  const {isAuthenticated,setIsAuthenticated,setUser}=useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://hospital-management-system-dkxp.onrender.com/api/v1/user/patient/me",{withCredentials: true});
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      };
    };
    fetchUser();
  } ,[isAuthenticated]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/department/:departmentName" element={<DepartmentDoctors />} />
          <Route path="/appointment/:doctorId" element={<Appointment />} />

        </Routes>
        <Footer/>
        <ToastContainer position='top-center' />
      </Router>

    </>
  );
};

export default App;