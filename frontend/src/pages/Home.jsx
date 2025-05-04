import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Popularbooks from '../components/Popularbooks'
import Features from '../components/Features'
import Footer from '../components/Footer';
import NewArrivals from "../components/NewArrivals";


const Home = () => {
  return (
    <>
    <Hero/>
    <NewArrivals/>
    <About/>
    <Popularbooks/>
    <Features/>
    <div className='max-padd-container bg-white'>
    <Footer/>
    </div>
    </>
  )
}

export default Home
