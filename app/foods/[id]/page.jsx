"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { foodItems } from '@/assets/assets';
import Image from 'next/image';
import { FaCartPlus } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";



const SingleFoodPage = () => {
  const { id } = useParams();
  const food = foodItems.find(item => item.id === Number(id));

  if (!food) return <p className="text-center text-xl mt-10">❌ Food item not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 min-h-screen">
      {/* Product Display Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Left Side: Product Image */}
        <div className="w-full md:w-1/2">
          <Image src={food.image} alt={food.name} width={400} height={400} className="w-full h-auto rounded-md" />
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold">{food.name}</h1>
          <p className="text-gray-600 text-lg mt-2">{food.description}</p>
          <p className="text-yellow-500 mt-2 text-lg">⭐ {food.rating} / 5</p>
          <p className="text-green-700 font-bold text-2xl mt-2">{food.price}</p>
          <p className="text-sm text-gray-500 mt-1">Category: {food.category}</p>

          {/* Additional Product Info */}
          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg font-semibold">Product Details</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
              <li><strong>Origin:</strong> {food.origin || "Not specified"}</li>
              <li><strong>Nutrients:</strong> {food.nutrients || "Nutritional information not available"}</li>
              <li><strong>Availability:</strong> {food.availability || "In stock"}</li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-700 transition">
              Add to Cart <FaCartPlus/>
            </button>
            <button className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-yellow-600 transition">
              Buy Now <IoBagCheckOutline/>
            </button>
          </div>
        </div>
      </div>

      {/* Additional Information / Customer Reviews (Placeholder) */}
      <div className="mt-10">
         <p className='text-gray-500 mt-2'>{food.description}</p>
        <h3 className="text-2xl font-semibold">Customer Reviews</h3>
        <p className="text-gray-500 mt-2">⭐ 4.5 | Based on 120 reviews</p>
        <p className="text-gray-600 italic mt-4">"Great quality! Fresh and organic, highly recommend!"</p>
      </div>
    </div>
  );
};

export default SingleFoodPage;
