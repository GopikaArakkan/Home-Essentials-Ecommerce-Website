import { useEffect, useState } from "react";
import api from "../api"; 
// or "../../api" depending on file location
import { Link } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
   const [showReviewForm, setShowReviewForm] = useState(false);
   const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  
  
  




  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const { data } = await api.get(
          "api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-10">Loading orders...</p>;
  if (orders.length === 0) return <p className="p-10">No orders found</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl text-white bg-green-800 p-5 font-bold  rounded-2xl text-center">Order History</h1>

      {orders.map((order) => {
        const deliveryDate = new Date(order.createdAt);
        deliveryDate.setDate(deliveryDate.getDate() + 5);

        return (
          <div
            key={order._id}
            className="bg-gray-100 p-10 rounded-2xl mb-10"
          >
            {/* PRODUCT CARDS */}
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              {order.orderItems.map((item) => (
                <div
                  key={item.product}
                  className="bg-orange-50 border-2 rounded-2xl p-4 shadow-xl shadow-gray-400 border-orange-400 hover:shadow-2xl transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-80 object-cover rounded-xl mb-4 transition-all duration-300 ease-out
  hover:scale-105 shadow-lg shadow-gray-700"
                  />


              
          

                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                  <p className="font-semibold">₹{item.price}</p>

                  <p className="text-sm text-gray-600 mt-2">
                    Ordered on:{" "}
                    {new Date(order.createdAt).toDateString()}
                  </p>

                  <p className="text-sm text-green-700">
                    Expected Delivery: {deliveryDate.toDateString()}
                  </p>
                </div>
              ))}
            </div>

            {/* ORDER DETAILS */}
           

            <Link
              to="/shop"
              className="inline-block font-bold mt-3 text-green-700 underline"
            >
              Go To Shopping →
            </Link>
          </div>
        );
      })}
    </div>
  );
}
