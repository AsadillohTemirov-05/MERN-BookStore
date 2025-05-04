import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'

const App = () => {
  return (
   <main className='overflow-hidden bg-primary'>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/shop' element={<Shop/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/place-order' element={<PlaceOrder/>} />
      <Route path="/orders" element={<Orders/>} />
    </Routes>
   </main>
  )
}

export default App
