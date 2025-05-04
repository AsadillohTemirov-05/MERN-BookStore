import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_charges = 5;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]); 
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId) => {
        const cartData = { ...cartItems };
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/add',{itemId},{headers:{token}});

            } catch (error) {
                console.log(error);
                toast.error(error.message);
                
            }
        }
    };






    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            try {
                if (cartItems[item] > 0) {
                    totalCount += cartItems[item];
                }
            } catch (error) {}
        }
        return totalCount;
    };


    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            }
        } catch (error) {
            console.error("Error loading products:", error);
        }
    };
    

    const updateQuantity = async (itemId, quantity) => {
        const cartData = { ...cartItems };
        cartData[itemId] = quantity;
        setCartItems(cartData);

        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,quantity},{headers:{token}})
            } catch (error) {
               console.log(error);
                    toast.error(error.message);
            }
        }
    };







    
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((book) => book._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };



    const getUserCart=async (token)=>{
        try {
            const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}});
            if(response.data.success){
                setCartItems(response.data.cartData);

            }
        } catch (error) {
            console.log(error);
            toast.error(error);

        }
    }


    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));    
            getUserCart(localStorage.getItem('token'));

        }
        getProductsData();
    }, []);



   
    const contextValue = {
        books: products, 
        currency,
        navigate,
        token,
        setToken,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        getCartAmount,
        updateQuantity,
        delivery_charges,
        backendUrl,
        getProductsData
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
