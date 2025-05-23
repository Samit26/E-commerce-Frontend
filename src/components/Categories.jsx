import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import config from '../../config';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${config.backendUrl}/api/products/categories`);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id='categories' className='w-full h-full bg-white pt-5 pb-8 px-4 sm:px-20 flex flex-col justify-center items-center gap-8'>
      {/* Heading */}
      <div>
        <h2 className='text-black text-xl font-semibold'>Shop by Category</h2>
      </div>

      {/* Conditional View for Mobile and Larger Screens */}
      <div className="w-full">
        {/* Mobile View: Flex Wrap Layout */}
        <div className="sm:hidden w-full flex flex-wrap justify-start items-center gap-4">
          {categories.map((category, index) => (
            <Link
              to={`/category/${category.name}`}
              key={index}
              className="border border-gray-300 px-5 py-1 rounded-full flex items-center justify-center gap-2"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-8 w-8 object-cover rounded-full"
              />
              <span className="text-black text-sm font-semibold uppercase">{category.name}</span>
            </Link>
          ))}
        </div>

        {/* Desktop View: Horizontal Scrolling */}
        <div className="hidden sm:flex scroller w-full justify-start items-center overflow-scroll flex-nowrap gap-10">
          {categories.map((category, index) => (
            <Link
              to={`/category/${category.name}`}
              key={index}
              className='flex flex-col items-center justify-center px-2 gap-4'
            >
              <div className='group h-32 w-32 flex justify-center items-center rounded-full border border-gray-400 cursor-pointer'>
                <img
                  className='h-[100%] w-[100%] object-cover rounded-full bg-center transform scale-95 transition-transform duration-300 group-hover:scale-100'
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <div className='text-black text-sm uppercase text-center font-semibold'>{category.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;