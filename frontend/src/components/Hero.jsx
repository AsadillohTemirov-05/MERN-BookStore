import React from 'react'
import { Link } from 'react-router-dom'
import bg from "../assets/bg.png";
import pencil from "../assets/pencil.png";
const Hero = () => {
  return (
   <section className='max-padd-container py-20 xl:py-30'>
    <div className='flexCenter gap-12 flex-col xl:flex-row'>
        <div className='flex flex-1 flex-col pt-12 xl:pt-32'>
        <h1 className='h1 max-w-[46rem]'>Discover 
          <span className='inline-flex'> <span className='inline-flex items-center
         justify-center p-5 h-16 w-16 bg-secondary text-white -rotate-[31deg] rounded-full'>B</span> </span>ooks <span><img src={pencil} alt="" className='inline-flex relative '  height={49} width={49} /></span> That Inspire Your World
        </h1>  
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Error est perspiciatis dolore, cum assumenda consequuntur tempora.
              Iusto consectetur odit quaerat, nam aliquid quisquam atque, perspiciatis
               dolorum debitis error magnam cum earum minus! Soluta, sapiente tempore. 
               Molestiae, laboriosam accusamus. Nulla, alias.</p>
        <div className='mt-6'>
            <Link className='btn-secondaryOne' to={'/store'}>
                Explore Now
            </Link>
        </div>
        </div>

        <div className='flex flex-1 relative z-10 top-12'>
            <div>
                <img src={bg} height={588} width={588} alt="" />
            </div>
        </div>
        
       
    </div>
   </section>
  )
}

export default Hero
