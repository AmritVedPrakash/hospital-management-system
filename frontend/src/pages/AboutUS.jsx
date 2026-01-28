import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
const About = () => {
  return (
  <>
   <Hero
   title={"Lurn more about us || zeeCare Medical Institute"}
   imageUrl={"/services.png"}
   />
   <Biography imageUrl={"/logo.png"} />
  </>

  )
}

export default About