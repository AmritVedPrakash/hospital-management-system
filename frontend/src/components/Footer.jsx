import React from 'react'
import { Link } from 'react-router-dom';
import {FaPhone,FaLocationArrow} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
const Footer = () => {
    const hours = [
        {
            id: 1,
            day: "Monday",
            time: "9:00 AM - 11:00 PM",
        },
        {
            id: 2,
            day: "Tuesday",
            time: "12:00 PM - 12:00 PM",
        },
        {
            id: 3,
            day: "Wednesday",
            time: "10:00 AM - 10:00 PM",
        },
        {
            id: 4,
            day: "Thursday",
            time: "9:00 AM - 9:00 PM",
        },
        {
            id: 5,
            day: "Friday",
            time: "9:00 AM - 11:00 PM",
        },
        {
            id: 6,
            day: "Saturday",
            time: "9:00 AM - 11:00 PM",
        },
        {
            id: 7,
            day: "Sunday",
            time: "Closed",
        }
    ]
  return (
   <>
   <footer className='container'>
    <hr />
    <p>© {new Date().getFullYear()} ZEECARE  . All rights reserved.</p>
    <div className='content'>
        {/* <img src="/logo.png" alt="" className='logo-img' /> */}
        <h4>ZEECARE</h4>
    
     <div>
        <h4>Quick Links</h4>
        <ul>
            <Link to={"/"}>Home</Link>
            <Link to={"/appointment"}>Appointment</Link>
            <Link to={"about"}> About</Link>
        </ul>
     </div>
     <div>
        <h4>Houre</h4>
        {
            hours.map((hour) => (
                <div key={hour.id}>
                    <p>{hour.day}: {hour.time}</p>
                </div>
            ))
        }
     </div>
     <div>
        <h4>Contact</h4>
        <div>
            <FaPhone/>
            <span>999-999-999</span>
        </div>
        <div>
            <MdEmail/>
            <span>ZEECARE@gamil.com</span>
        </div>
        <div>
            <FaLocationArrow/>
            <span>Bhisamau, Lucknow, India</span>
     </div>
    </div>
    </div>
   </footer>
   </>
  )
}

export default Footer