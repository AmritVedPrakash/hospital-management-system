import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className='banner'>
        <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className='banner'>
        <p>Biopgraphy</p>
        <h3>who we Are</h3>
        
        <p>With a team of highly qualified doctors, nurses, and healthcare professionals, ZeeCare Medical Institute stands as a symbol of trust and excellence. Each member of our medical staff is trained to deliver ethical, safe, and effective treatment while maintaining empathy and respect for every patient.</p>

          <p>We believe that every patient deserves attention, understanding, and the highest standards of medical care.</p>
          <p>ZeeCare Medical Institute is a trusted name in healthcare, known for our dedication to patient care, medical innovation, and professional excellence. We offer a wide range of medical services, including general medicine, cardiology, orthopedics, pediatrics, gynecology, and diagnostic services.</p>

          <p>Our institute focuses on prevention, early detection, and personalized treatment plans to help patients achieve better health outcomes.</p>
      </div> 
    </div>
  )
}

export default Biography