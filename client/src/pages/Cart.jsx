import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalSavings = cartItems.reduce((acc, item) => {
    if (!item.originalPrice) return acc;
    return acc + (item.originalPrice - item.price) * item.qty;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="bg-cream min-h-screen flex flex-col items-center justify-center p-10">
        <h1 className="text-3xl font-serif text-green-900 mb-4">
          Your Cart
        </h1>
        <p className="text-gray-500 text-lg">
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-5 px-6">
      <div className="max-w-5xl mx-auto bg-gray-100 p-10">
        <h1 className="text-3xl bg-green-800 font-serif text-white rounded-2xl p-4 text-center mb-10">
          Your Cart
        </h1>

        {/* CART ITEMS */}
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-6 bg-orange-50 p-6 rounded-3xl shadow-xl border-2 border-orange-400 hover:shadow-gray-400 transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-2xl transition-all duration-300 ease-out
  hover:scale-105 shadow-lg shadow-gray-700"
              />

              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-2xl">
                  {item.name}
                </h3>

                <p className="text-xl font-semibold text-gray-900">
                  ₹{item.price}
                  {item.originalPrice && (
                    <span className="ml-3 text-sm line-through text-gray-400">
                      ₹{item.originalPrice}
                    </span>
                  )}
                </p>

                {item.originalPrice && (
                  <p className="text-sm text-green-700">
                    You save ₹{item.originalPrice - item.price}
                  </p>
                )}

                <p className="text-xl text-gray-600">
                  Qty: {item.qty}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-white bg-red-500 rounded-2xl p-3 font-bold text-sm hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* BUY NOW */}
        <div className="mt-2">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-2xl transition"
          >
            Buy Now
          </button>
        </div>

        {/* SAVINGS CARD */}
        {totalSavings > 0 && (
          <div className="mt-12 bg-orange-100 p-8 border-2 border-orange-400 rounded-3xl shadow-xl max-w-md">
            <p className="text-lg font-medium text-gray-700">
              Total Savings
            </p>
            <p className="text-3xl font-bold text-green-700 mt-3">
              ₹{totalSavings}
            </p>
          </div>
        )}
        <Link
              to="/shop"
              className="inline-block font-bold mt-3 text-green-700 underline hover:text-green-800"
            >
              Go To Shopping →
            </Link>
      </div>
    </div>
  );
}
