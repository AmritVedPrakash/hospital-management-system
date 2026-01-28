import React from 'react'
import Hero from '../components/Hero';
import AppointmentForm from '../components/AppointmentForm';
const Appointment = () => {
  return (
   <>
   <Hero 
   title={"Schedule Your Appointment | zeeCare Medical Institute"}
   imageUrl={"/appointment.png"}
   />
   <AppointmentForm />
   </>
  );
};
export default Appointment;