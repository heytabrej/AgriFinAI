"use client";
import Slider from 'react-slick';
import ProductImage from './ProductImage';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProductCarousel = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  function NextArrow(props) {
    return (
      <button {...props} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-green-50">
        <FiChevronRight className="w-6 h-6" />
      </button>
    );
  }

  function PrevArrow(props) {
    return (
      <button {...props} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-green-50">
        <FiChevronLeft className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="px-4 py-8">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105">
              <ProductImage src={product.image} alt={product.name} />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <div className="text-gray-600 text-sm mt-2">
                  <p>{product.location}</p>
                  <Link href={`/products/${product.id}`} className="mt-2 inline-flex items-center text-green-700 hover:text-green-900 text-sm">
                    <span>View Details</span>
                    <FiChevronRight className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel; 