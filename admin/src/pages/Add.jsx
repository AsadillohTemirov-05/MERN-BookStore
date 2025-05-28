import React, { useState } from 'react';
import upload_icon from "../assets/upload_icon.png";
import { toast } from 'react-toastify';
import axios from "axios";
import { backend_url } from '../App';

const Add = ({ token }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Fiction');
  const [popular, setPopular] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('No authorization token found!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("category", category);
      formData.append("popular", popular); 
      formData.append("image",image);

     const response=await axios.post(`${backend_url}/api/product/create`,formData,{headers:{token}});
     if(response.data.success){
      toast.success("Product Succesfully Created");
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setPopular(false);

     }
     else{
      toast.error(response.data.message);
      
     }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create product!');
    }
  };

  return (
    <div className='px-2 sm:px-8 sm:mt-14 pb-16'>
      <form className='flex flex-col gap-y-3 medium-14 lg:w-[777px]' onSubmit={onSubmitHandler}>
        <div className='w-full'>
          <h5>Product Name</h5>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder='Write Here...'
            className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded mt-1 w-full max-w-lg'
          />
        </div>

        <div className='w-full'>
          <h5>Product Description</h5>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Write Here...'
            value={description}
            className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded mt-1 w-full max-w-lg'
          />
        </div>

        <div className='flex items-end gap-x-6'>
          <div>
            <h5>Category</h5>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='px-3 py-3 ring-1 ring-slate-900/10 rounded bg-white mt-1 sm:w-full text-gray-30'
            >
              <option value="Fiction">Fiction</option>
              <option value="Children">Children</option>
              <option value="Health">Health</option>
              <option value="Academic">Academic</option>
              <option value="Business">Business</option>
              <option value="Religious">Religious</option>
            </select>
          </div>

          <div className='flex gap-x-2 pt-2'>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : upload_icon}
                alt="Upload Preview"
                className="w-14 h-14 aspect-square object-cover ring-1 ring-slate-900/10 bg-white rounded-lg"
              />
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>
          </div>
        </div>

        <div>
          <h5>Price</h5>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder='Price'
            min={0}
            className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded mt-1 w-20 max-w-lg bg-white'
          />
        </div>

        <div className='flexStart gap-2 my-2'>
          <input
            onChange={() => setPopular((prev) => !prev)}
            type="checkbox"
            checked={popular}
            id='popular'
          />
          <label htmlFor="popular" className='cursor-pointer'>Add To Popular</label>
        </div>

        <button type='submit' className='btn-dark mt-3 max-w-44 sm:w-full'>Add Product</button>
      </form>
    </div>
  );
};

export default Add;
