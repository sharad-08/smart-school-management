import React from 'react'
import Banner from '../components/Banner'
import Events_Activites from '../components/Events_Activites'
import Ourgoal from '../components/Ourgoal'
import Aboutus from '../components/Aboutus'
import FacilitiesC from '../components/FacilitiesC'
import Enroll from '../components/Enroll'
import Footer from '../components/Footer'
const Home=() =>{
  return (
    <div>
        <Banner />
        <Events_Activites/>
        <Ourgoal/>
        <Aboutus/>
        <FacilitiesC/>
        <Enroll/>
       

    </div>
  )
}

export default  Home ;