import React from 'react'
import { useState,useEffect } from 'react'
import {backend_url,currency} from "../App";
import axios from "axios";
import {toast} from "react-toastify";
import {TfiPackage} from "react-icons/tfi";

const Orders = ({token}) => {

  const [orders,setOrders]=useState([]);


  const fetchAllOrders=async ()=>{

    if(!token){
      return null;

    }
    try {
      const response=await axios.post(backend_url+'/api/order/list',{},{headers:{token}});
        console.log(response.data.orders);
      if(response.data.success){
        setOrders(response.data.orders);
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error); 
    }
  }


  useEffect(()=>{
    fetchAllOrders();
  },[token]);

  return (
    <div>
      <div>
        {orders.map((order)=>(
          <div>
            <div>
              <TfiPackage className='text-3xl text-secondary'/>
            </div>
            <div>
              <div>
                <div>Items</div>
                <div>
                 {
                  order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                      return <p>
                        {item.name} x {item.quantity}
                      </p>
                    }else{
                      return <p key={index}>
                        {item.name} x {item.quantity}
                      </p>
                    }
                  })}
                  </div>
              </div>
            <p> <span className='text-tertiary'>Name:</span>{order.address.firstName+ " "+order.address.lastName} </p>
            <p> <span className='text-tertiary'>Address:</span>{order.address.street+","}
            <span>{order.address.city+","+order.address.state+" "+order.address.country+","+order.address.zipcode}</span> </p>
            <p>{order.address.phone}</p>

            </div>
            <div>
              <p><span className='text-tertiary medium-14'>Total: <span>{order.items.length}</span></span></p>

              <p><span className='text-tertiary medium-14'>Payment:</span> <span>{order.payment?"Done":"Pending"}</span></p>
              <p><span className='text-tertiary medium-14'>Date:</span> <span>{new Date(order.date).toLocaleDateString()}</span></p>
            </div>

            <p><span className='text-tertiary medium-14'>Date:</span> <span>{new Date(order.date).toLocaleDateString()}</span></p>
              
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Orders
