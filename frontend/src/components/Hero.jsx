import React from 'react'
// import '../App.css';
const Hero = ({title,imageUrl}) => {
  return (
    <div className='hero container'>
        <div className='banner'>
            <h1>{title}</h1>
            <p>
                At ZeeCare Medical Institute, we are committed to delivering compassionate,
                high-quality, and affordable healthcare services. Our team of experienced doctors,
                modern facilities, and patient-centered approach ensure that you receive the best 
                care possible — every time you visit us.
            </p>
        </div>
        <div className='banner'>
            <img src={imageUrl} alt="hero" className='animated-image' />
            {/* <span>
                <img src="/Vector.png" alt="vector" />
            </span> */}
        </div>
    </div>
  ); 
};

export default Hero