import React, { useState } from 'react'
import loginImg from "../assets/login.png";
import { backend_url } from '../App';
import { toast } from 'react-toastify';
import axios from "axios";

const Login = ({setToken}) => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const onSubmitHandler= async (e)=>{
        try {
           e.preventDefault();
            console.log(email,password);
            const response=await axios.post(backend_url+'/api/user/admin',{email,password});
            console.log(response);
            if(response.data.success){
                setToken(response.data.token);
            }
            else{
                toast.error(response.data.message)
            }


        } catch (error) {
            
        }
    }


  return (
    <section className='absolute top-0 left-0 h-full w-full z-50 bg-white'>
      {/* Login */}
      <div className='flex h-full w-full'>
        <div className='w-1/2 hidden sm:block'>
            <img className='object-cover h-full w-full' src={loginImg} alt="" />
        </div>

        <div className='flexCenter w-full sm:w-1/2'>
            <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800'>
                <div className='w-full mb-4 '>
                    <h3 className='bold-36'>Admin Panel</h3>
                </div>
                <div className='w-full'>
                    <label className='medium-15' htmlFor="email">Email</label>
                    <input  value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email' className='w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary  mt-1' />
                </div>

                <div className='w-full'>
                    <label htmlFor="password" className='medium-15'>Password</label>
                    <input value={password}  onChange={(e)=>setPassword(e.target.value)} className='w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary  mt-1' type="password" placeholder='Password'/>
                </div>
                <button type='submit' className='btn-dark w-full mt-5 !py-[7px] !rounded '>Login</button>
            </form>
        </div>
      </div>
    </section>
  )
}

export default Login
