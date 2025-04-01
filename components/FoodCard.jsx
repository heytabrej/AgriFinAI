import Link from "next/link";

const FoodCard = ({ food }) => {
  return (
    <Link href={`/foods/${food.id}`}>
      <div className="border rounded-lg p-4 shadow-md bg-white w-64 cursor-pointer">
        <img src={food.image} alt={food.name} className="w-full h-40 object-cover rounded-md" />
        <h3 className="text-lg font-semibold mt-2">{food.name}</h3>
        <p className="text-sm text-gray-600">{food.description}</p>
        <p className="text-yellow-500 mt-1">⭐ {food.rating}</p>
        <p className="text-green-700 font-bold mt-2">{food.price}</p>
        <p className="text-sm text-gray-500">Category: {food.category}</p>
      </div>
    </Link>
  );
};

export default FoodCard