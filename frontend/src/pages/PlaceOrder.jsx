import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal';
import Footer from '../components/Footer';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const PlaceOrder = () => {

  const {books,navigate,token,cartItems,setCartItems,getCartAmount,delivery_charges,backendUrl }=useContext(ShopContext);

  const [method,setMethod]=useState('cod');
  const [formData,setFormData]=useState({
      firstName:'',
      lastName:'',
      email:"",
      street:'',
      address:'',
      city:'',
      state:'',
      zipcode:'',
      country:'',
      phone:'',

  });


  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;

    setFormData(data=>({...data,[name]:value}));

  }


  const onSubmitHandler=async ()=>{
    event.preventDefault();

    try {
      let orderItems=[];


      for(const itemId in cartItems){
        if(cartItems[itemId]>0){
          const itemInfo=books.find((book)=>book._id===itemId);
          if(itemInfo){
            orderItems.push({...itemInfo,quantity:cartItems[itemId]});

          }

        }
      }
      let orderData={
        address:formData,
        items:orderItems,
        amount:getCartAmount()+delivery_charges
      };

      switch(method){

        case 'cod':
          const response=await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}});
          if(response.data.success){
            setCartItems({});
            navigate('/orders');

          }else{
            toast.error(error.message);

          };
          break;
        
          default:
            break;




      }

    } catch (error) {
      console.log(error);

    }

  }


  return (
    <section className='max-padd-container'>
      <form  onSubmit={onSubmitHandler} className='pt-28'>
        <div className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
          <div className='flex flex-1 flex-col gap-4 text-[95%]'>
            <Title title1={'Delivery'} title2={'Information'} title1Styles={'h3'} />

            {/* First and Last Name */}
            <div className='flex gap-3'>
              <input onChange={onChangeHandler}
                type="text" value={formData.firstName}
                name='firstName'
                placeholder='First Name'
                className='ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-1/2'
              />
              <input onChange={onChangeHandler}
                type="text" value={formData.lastName}
                name='lastName'
                placeholder='Last Name'
                className='ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-1/2'
              />
            </div>

            {/* Email */}
            <input
            onChange={onChangeHandler}
              type="email" value={formData.email}
              name='email'
              placeholder='Email'
              className='ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-full'
            />

            {/* Phone */}
            <input

            onChange={onChangeHandler}
              type="text" value={formData.phone}
              name='phone'
              placeholder='Phone Number'
              className='ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-full'
            />

            {/* Street */}
            <input

            onChange={onChangeHandler}
              type="text" value={formData.street}
              name='street'
              placeholder='Street'
              className='ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-full'
            />

            {/* City and State */}
            <div className='flex gap-3'>
              <input
              onChange={onChangeHandler}
                type="text"
                name='city' value={formData.city}
                placeholder='City'
                className='ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-1/2'
              />
              <input
                onChange={onChangeHandler}
                type="text"
                name='state' value={formData.state}
                placeholder='State'
                className='ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-1/2'
              />
            </div>

            {/* ZipCode and Country */}
            <div className='flex gap-3'>
              <input
              onChange={onChangeHandler}
                type="text" value={formData.zipcode}
                name='zipcode'
                placeholder='Zip Code'
                className='ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-1/2'
              />
              <input
              onChange={onChangeHandler}
                type="text"
                name='country' value={formData.country}
                placeholder='Country'
                className='ring-1 ring-slate-900/15 p-2 pl-3 rounded-sm bg-primary outline-none w-1/2'
              />
            </div>
          </div>

          {/* Right Side */}
          <div className='flex flex-1 flex-col'>
            <CartTotal/>
            <div className='my-6 '>
            <h2 className='bold-20 mb-5'>Payment <span className='text-secondary'>Method</span></h2>
            <div className='flex gap-3'>
            <div onClick={() => setMethod('stripe')} className={`${method === 'stripe' ? "btn-secondary" : "btn-white"} !py-1 text-xs cursor-pointer`}>Stripe
          </div>

        <div onClick={() => setMethod('cod')} className={`${method === 'cod' ? "btn-secondary" : "btn-white"} !py-1 text-xs cursor-pointer`}>
        Cash On Delivery
        </div>

            </div>
            </div>

            <div>
              <button type='submit' className='btn-secondaryOne'>Place Order</button>
            </div>

          </div>
        </div>
      </form>

      <Footer/>
    </section>
  )
}

export default PlaceOrder;
