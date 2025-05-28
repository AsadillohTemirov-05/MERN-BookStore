import React, { useContext, useEffect, useState, useRef } from 'react'
import logoImg from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { CgMenuLeft } from "react-icons/cg";
import { TbUserCircle } from "react-icons/tb";
import { RiUserLine, RiShoppingBag4Line } from "react-icons/ri";
import { ShopContext } from '../context/ShopContext';

const Header = () => {
  const { navigate, token, setToken, getCartCount, setCartItems } = useContext(ShopContext);

  const [active, setActive] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && menuOpened) {
        setMenuOpened(false);
      }
      setActive(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpened]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logOut = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <header className='fixed top-0 bg-white w-full left-0 right-0 z-50'>
      <div className={`${active ? 'bg-white py-2.5' : 'py-3'}
       max-padd-container flexBetween border-b border-slate-900/5 
       rounded transition-all duration-300`}>

        <Link to='/' className='flex-1 flex items-center justify-start'>
          <img src={logoImg} height={36} width={36} className='hidden sm:flex mr-2' alt="logo" />
          <h4 className='bold-24'>Globus</h4>
        </Link>


        <div className='flex-1'>
          <Navbar
            toggleMenu={toggleMenu}
            menuOpened={menuOpened}
            containerStyles={
              menuOpened
                ? "flex flex-col gap-y-16 h-screen w-[222px] absolute left-0 top-0 bg-white z-50 px-10 py-4 shadow-xl"
                : "hidden xl:flex justify-center gap-x-8 xl:gap-x-14 medium-15 px-2 py-1"
            }
          />
        </div>

        <div className='flex-1 flex justify-end gap-x-3 sm:gap-x-10 items-center'>
          <CgMenuLeft onClick={toggleMenu} className='text-2xl xl:hidden cursor-pointer' />

          <Link className='flex relative' to='/cart'>
            <RiShoppingBag4Line className='text-[33px] bg-secondary text-primary p-1.5 rounded-full' />
            <span className='bg-primary ring-1 ring-slate-900/5 medium-14 absolute -top-2.5 flexCenter w-5 h-5 rounded-full shadow-md'>{getCartCount()}</span>
          </Link>

          <div className='relative' ref={dropdownRef}>
            {token ? (
              <>
                <div className='cursor-pointer flexCenter' onClick={() => setShowDropdown((prev) => !prev)}>
                  <TbUserCircle className='text-[29px]' />
                </div>
                {showDropdown && (
                  <ul className='bg-white p-1 w-32 ring-1 ring-slate-900/5 
                  rounded absolute top-10 flex flex-col regular-14 shadow-md'>
                    <li onClick={() => { navigate('/orders'); setShowDropdown(false); }} className='p-2 text-tertiary rounded-md hover:bg-primary cursor-pointer'>Orders</li>
                    <li onClick={() => { logOut(); setShowDropdown(false); }} className='p-2 text-tertiary rounded-md hover:bg-primary cursor-pointer'>LogOut</li>
                  </ul>
                )}
              </>
            ) : (
              <button className='btn-outline flexCenter gap-x-2' onClick={() => navigate('/login')}>
                Login <RiUserLine />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
