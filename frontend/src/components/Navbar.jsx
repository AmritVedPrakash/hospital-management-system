import React, { useContext } from 'react'
import{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Context } from '../main'; // Assuming UserContext is defined and provides user data
import axios from 'axios';
import { toast } from 'react-toastify';
import {GiHamburgerMenu} from "react-icons/gi";

const Navbar = () => {
    const [show, setShow] = useState(false);  // (add extra )State to manage the visibility of the menu
    const {isAuthenticated,setIsAuthenticated}=useContext(Context); // Assuming UserContext is defined and provides user data
    const navigateTo = useNavigate(); // Using useNavigate hook from react-router-dom
    const handleLogout = async() => {
        
            await axios.get("https://hospital-management-system-dkxp.onrender.com/api/v1/user/patient/logout", {withCredentials:true,
            }).then((res)=>{toast.success(res.data.message);
                setIsAuthenticated(false);
            }).catch((err)=>{
                toast.error(err.response.data.message);
            });
    };
        const gotoLogin = () => {
        navigateTo("/login"); // Navigate to the login page
        };
  return (
    <nav className='container'>
        <div className='logo'>
            <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navlinks showmenu" : "navLinks"}>
            <div className="links">
                <Link to={"/"}>HOME</Link>
                <Link to={"/appointment"}>APPOINTMENT</Link>
                <Link to={"/about"}>ABOUT US</Link>

            </div>
            {isAuthenticated ? (<button className='logoutBtn btn' onClick={handleLogout}>LOGOUT</button>):(<button className='logoutBtn btn' onClick={gotoLogin}>LOGIN</button>)}
        </div>
        <div className='hamburger' onClick={()=>setShow(!show)}>
            <GiHamburgerMenu  />

        </div>
    </nav>
  
  );
};

export default Navbar;