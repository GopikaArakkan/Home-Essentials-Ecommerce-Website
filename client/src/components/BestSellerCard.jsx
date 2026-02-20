import { Link } from "react-router-dom";

export default function BestSellerCard({ product }) {
  if (!product) return null;

  return (
    <Link
      to={`/product/${product._id}`}
      className="group bg-orange-50 border-2 border-orange-400 rounded-3xl overflow-hidden shadow-lg shadow-gray-400 hover:shadow-gray-700 hover:-translate-y-1 transition block"
    >
      {/* IMAGE */}
      <div className="relative h-72 overflow-hidden">
      <img
  src={product.images?.[0] || "/placeholder.jpg"}
  alt={product.name}

  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
/>
        {/* BADGE */}
        <span className="absolute top-4 left-4 bg-primary text-cream text-xs px-3 py-1 bg-green-300 rounded-full">
          Bestseller
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-800">
          {product.name}
        </h3>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-semibold text-lg text-primary">
           ₹{product.price}
          </span>

          <div>
          <span className="text-sm text-red-500 group-hover:text-primary">
            Discount 50% 
          </span>
          </div>

          <span className="text-sm text-gray-500 group-hover:text-primary">
            View →
          </span>
          
        </div>
      </div>
    </Link>
  );
}
