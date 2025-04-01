import React from 'react'
import { foodItems } from '@/assets/assets'
import FoodCard from './FoodCard'

const ProductList = () => {
  return (
   <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
   {foodItems.map((food) => (
     <FoodCard key={food.id} food={food} />
   ))}
 </div>
  )
}

export default ProductList