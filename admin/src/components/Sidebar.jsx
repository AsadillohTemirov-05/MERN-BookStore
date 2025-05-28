import React from 'react'
import {FaSquarePlus} from "react-icons/fa6";
import {NavLink,Link} from "react-router-dom";
import {FaListAlt} from "react-icons/fa";
import {MdFactCheck} from "react-icons/md";
import {BiLogOut} from "react-icons/bi";
import logo from "../assets/logo.png";

const Sidebar = ({setToken}) => {
  return (
    <div className='max-sm:flexCenter max-xs:pb-3 rounded bg-white
     pb-3 sm:w-1/5 sm:min-h-screen '>
    <div className='flex flex-col gap-y-6 max-sm:items-center 
    sm:flex-col pt-4 sm:pt-14'>
      <Link to={'/'} className='bold-24 flex items-baseline sm:pl-12'>
        <img src={logo} width={24} height={24} alt="" />
        <span className='text-secondary pl-2'>Bacala</span>
      </Link>
  
      <div className='flex sm:flex-col  gap-y-8 gap-x-5 mt-10 sm:pt-10'>
  
        <NavLink to={'/'} className={({ isActive }) =>
          isActive ? "active-link" : "flex items-center gap-x-2 pl-6 py-2 text-sm cursor-pointer rounded-xl"}>
          <FaSquarePlus />
          <span className='text-sm'>Add Item</span>
        </NavLink>
  
        <NavLink to={'/list'} className={({ isActive }) =>
          isActive ? "active-link" : "flex items-center gap-x-2 pl-6 py-2 text-sm cursor-pointer rounded-xl"}>
          <FaListAlt />
          <span className='text-sm'>List</span>
        </NavLink>
  
        <NavLink to={'/orders'} className={({ isActive }) =>
          isActive ? "active-link" : "flex items-center gap-x-2 pl-6 py-2 text-sm cursor-pointer rounded-xl"}>
          <MdFactCheck />
          <span className='text-sm'>Orders</span>
        </NavLink>
  

        <div className='max-sm:ml-5 sm:mt-80'>
        <button  onClick={()=>setToken('')}  className='flexStart items-center gap-x-2 pl-6 py-2 text-sm cursor-pointer rounded-xl'>
          <BiLogOut   className='text-lg' />
          <span className='text-sm'>Logout</span>
        </button>
      
        </div>
      
      </div>
    </div>
  </div>
  
  )
}

export default Sidebar
