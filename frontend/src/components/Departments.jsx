import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const navigate = useNavigate();

  const departmentsArray = [
    { name: "Pediatrics", imageUrl: "/departments/pedia.png" },
    { name: "Orthopedics", imageUrl: "/departments/ortho.png" },
    { name: "Cardiology", imageUrl: "/departments/cardio.png" },
    { name: "Neurology", imageUrl: "/departments/neuro.png" },
    { name: "Oncology", imageUrl: "/departments/onco.png" },
    { name: "Radiology", imageUrl: "/departments/radio.png" },
    { name: "Physical Therapy", imageUrl: "/departments/therapy.png" },
    { name: "Dermatology", imageUrl: "/departments/derma.png" },
    { name: "ENT", imageUrl: "/departments/ent.png" },
  ];

  const responsive = {
    extraLarge: { breakpoint: { max: 3000, min: 1324 }, items: 4 },
    large: { breakpoint: { max: 1324, min: 1005 }, items: 3 },
    medium: { breakpoint: { max: 1005, min: 700 }, items: 2 },
    small: { breakpoint: { max: 700, min: 0 }, items: 1 },
  };

  const handleClick = (departmentName) => {
    navigate(`/department/${departmentName}`);
  };

  return (
    <div className='container departments'>
      <h2>Departments</h2>
      <Carousel responsive={responsive} removeArrowOnDeviceType={["medium", "small"]}>
        {departmentsArray.map((depart) => (
          <div
            className='card'
            key={depart.name}
            onClick={() => handleClick(depart.name)}
            style={{ cursor: "pointer" }}
          >
            <div className='depart-name'>{depart.name}</div>
            <img src={depart.imageUrl} alt={depart.name} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Departments;
