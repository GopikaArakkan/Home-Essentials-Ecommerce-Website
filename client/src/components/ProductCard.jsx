import { Link } from "react-router-dom"


export default function ProductCard({ product, showBadge = false }) {
    const rating =
    product.numReviews && product.numReviews > 0
      ? product.rating
      : 4

  const reviews =
    product.numReviews && product.numReviews > 0
      ? product.numReviews
      : 3

  return (
    <Link
      to={`/product/${product._id}`}
      className="group bg-orange-50 border-2 border-orange-400 rounded-3xl overflow-hidden shadow-lg shadow-gray-400 hover:shadow-gray-700 hover:-translate-y-1 transition block"
    >
      {/* IMAGE */}
      <div className="relative h-72 overflow-hidden">
        
        {/* BESTSELLER TAG */}
        {showBadge && (
          <span className="absolute top-4 left-4 z-10 bg-green-800 text-white text-xs font-medium px-4 py-1 rounded-full">
            Bestseller
          </span>
        )}

    <img
  src={product.images?.[0] || "/placeholder.jpg"}
  alt={product.name}


  className="h-full w-full object-cover group-hover:scale-105 transition duration-500 "
/>


      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h3 className="text-gray-900 font-medium text-lg">
          {product.name}
        </h3>

       <div className="mt-4 flex items-center justify-between">
  <div>
    <span className="text-lg font-semibold text-gray-900">
      ₹{product.price}
    </span>

    <div className="flex items-center gap-1 text-sm mt-1">
      <span className="text-yellow-400">
        {"★".repeat(Math.round(rating))}
        {"☆".repeat(5 - Math.round(rating))}
      </span>
      <span className="text-gray-500">
        ({reviews})
      </span>
    </div>
  </div>

  <span className="text-sm text-gray-500 group-hover:text-green-800 transition">
    View →
  </span>
</div>

      </div>
    </Link>
  )
}
