import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api"; 
// or "../../api" depending on file location

export default function OrderScreen() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const steps = [
    "Order Confirmed",
    "Start Production",
    "Quality Check",
    "Dispatched",
    "Delivered",
  ];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const { data } = await api.get(
          `/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
    
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <h2 className="p-10">Loading...</h2>;
  if (!order) return <h2 className="p-10">Order not found</h2>;

  const deliveryDate = new Date(order.createdAt);
  deliveryDate.setDate(
    deliveryDate.getDate() + 5 + Math.floor(Math.random() * 3)
  );

  // ✅ DEFINE ONCE, OUTSIDE MAP
  const currentStep = order.isPaid ? 0 : -1;

  return (
    <div className="pl-6 pr-6 bg-gray-100">
      <h1 className="text-3xl mb-6 bg-green-800 text-white p-5 rounded-2xl text-center font-extrabold">Track Your Orders</h1>

      {/* ================= ORDER ITEMS ================= */}
      <div className="flex gap-6 flex-wrap">
        {order.orderItems.map((item) => (
          <div
            key={item._id}
            className="bg-orange-50 p-5 rounded-2xl border-2 border-orange-400 shadow-xl shadow-gray-400 w-[480px]"
          >
            {/* PRODUCT INFO */}
            <div className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-36 h-36 object-cover rounded-xl transition-all duration-300 ease-out
  hover:scale-105 shadow-lg shadow-gray-700"
              />

              <div>
                <p className="font-extrabold text-xl">{item.name}</p>
                <p>Qty: {item.qty}</p>
                <p className="font-semibold">₹{item.price}</p>

                <p className="text-sm text-gray-600 mt-1">
                  Ordered on:{" "}
                  {new Date(order.createdAt).toDateString()}
                </p>

                <p className="text-sm text-green-700">
                  Expected Delivery: {deliveryDate.toDateString()}
                </p>
              </div>
            </div>

            {/* SHIPPING ADDRESS */}
            <div className="mt-4 bg-white rounded-xl p-4">
              <p className="text-sm text-green-700 font-bold mb-1">Shipping Address</p>
              <p className="text-sm">
                {order.shippingAddress?.address}
             
              </p>
              <p className="text-sm">
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state} -{" "}
                {order.shippingAddress?.postalCode}
              </p>
              <p className="text-sm">
                {order.shippingAddress?.country}
              </p>
            </div>

            {/* ORDER STATUS TRACKER */}
            <div className="mt-4 bg-white rounded-xl p-4">
              <p className="text-sm font-semibold mb-3 text-center">
                Order Status
              </p>

              <div className="flex justify-between text-xs text-center">
                {steps.map((step, index) => {
                  const isCompleted = index <= currentStep;

                  return (
                    <div key={index} className="flex-1">
                      <div
                        className={`mx-auto mb-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-orange-300 text-white"
                        }`}
                      >
                        {isCompleted ? "✓" : index + 1}
                      </div>
                      <p
                        className={
                          isCompleted
                            ? "text-green-700"
                            : "text-gray-500"
                        }
                      >
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL + CONTINUE */}
      <div className="mt-10 flex items-center justify-between bg-white rounded-2xl px-8 py-6 shadow-md">
        <div>
          <p className="text-sm text-gray-500">Paid Total</p>
          <h2 className="text-2xl font-extrabold text-green-800">
            ₹{order.totalPrice}
          </h2>
        </div>

        <Link to="/shop">
          <button
            onClick={() => navigate("/shop")}
            className="bg-gradient-to-r from-orange-900 to-orange-300 text-white px-6 py-3 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition"
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}