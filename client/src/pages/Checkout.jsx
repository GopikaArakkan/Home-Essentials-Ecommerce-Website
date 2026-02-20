import { useState } from "react";
import { useCart } from "../context/CartContext";
 import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Checkout() {
 

  const { cartItems, clearCart } = useCart();

const navigate = useNavigate();



  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const [codOption, setCodOption] = useState(""); // "same" | "new"
 
const [showSuccess, setShowSuccess] = useState(false);

const [orderId, setOrderId] = useState(null);



  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const [codAddress, setCodAddress] = useState({
  address: "",
  city: "",
  state: "",
  zip: "",
});


useEffect(() => {
  const savedAddresses =
    JSON.parse(localStorage.getItem("addresses")) || [];

  const defaultAddress = savedAddresses.find(
    (addr) => addr.isDefault
  );

  if (defaultAddress) {
    setForm((prev) => ({
      ...prev,
      fullName: defaultAddress.name || "",
      address: defaultAddress.street || "",
      city: defaultAddress.city || "",
      state: defaultAddress.state || "",
      zip: defaultAddress.pincode || "",
    }));
  }
}, []);


// ✅ STOP if cart is empty
if (cartItems.length === 0 && !showSuccess) {
  return (
    <div className="bg-cream min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg">
        Your cart is empty
      </p>
    </div>
  );
}



const billingAddressText = `
${form.address}
${form.city}, ${form.state} - ${form.zip}
`;


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


const handleCodAddressChange = (e) => {
  setCodAddress({
    ...codAddress,
    [e.target.name]: e.target.value,
  });
};


 const isFormValid = (() => {
  if (paymentMethod === "cod") {
    if (codOption === "") return false;

    if (codOption === "new") {
      return Object.values(codAddress).every(
        (value) => value.trim() !== ""
      );
    }

    return true; // same billing address
  }

  return Object.values(form).every(
    (value) => value.trim() !== ""
  );
})();



  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shipping = 200;
  const total = subtotal + shipping;

 const handlePayment = async () => {
  if (!isFormValid) return;

  try {
    // ✅ 1. Get logged in user
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      alert("Please login first");
      return;
    }

    // ✅ 2. Prepare order object
   // ✅ 2. Prepare order object
const order = {
  orderItems: cartItems.map((item) => ({
    name: item.name,
    qty: item.qty,
    image: item.image,
    price: item.price,
    product: item._id,
  })),

  shippingAddress: {
    address: form.address,
    city: form.city,
    state: form.state,
    postalCode: form.zip,
    country: "India",
  },

  totalPrice: total,
  isPaid: true,
};
console.log("USER INFO:", userInfo);
console.log("TOKEN:", userInfo?.token);

  console.log("ORDER BEING SENT:", order);
    // ✅ 3. Send order to backend WITH TOKEN
    const { data } = await axios.post(
      "http://localhost:5000/api/orders",
      order,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );



   clearCart();
setOrderId(data._id);   // 👈 save order id
setShowSuccess(true);   // 👈 show popup

    // ✅ 4. Redirect to order page
   
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};



  return (
    <div className="bg-cream min-h-screen pt-2 px-8">
      <h1 className="text-3xl font-serif text-white bg-green-800 p-5 rounded-2xl text-center mb-10">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 bg-orange-50 p-8 rounded-3xl shadow-gray-4 shadow-2xl">
          {/* BILLING */}
          <h2 className="text-xl text-green-800 underline text-underline-offset-2px font-semibold mb-6">
            Billing Address
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-sm mb-1 ">Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">State</label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Zip Code</label>
              <input
                name="zip"
                value={form.zip}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* PAYMENT */}
          <h2 className="text-xl text-green-800 font-semibold underline text-underline-offset-2px mt-10 mb-4">
            Payment
          </h2>

          {/* PAYMENT METHOD */}
          <div className="flex gap-4 mb-6">
  <button
    onClick={() => setPaymentMethod("stripe")}
    className={`border rounded-xl px-4 py-2 ${
      paymentMethod === "stripe"
        ? "bg-green-700 text-white"
        : "border-gray-300"
    }`}
  >
    Stripe
  </button>

  <button
    onClick={() => setPaymentMethod("razorpay")}
    className={`border rounded-xl px-4 py-2 ${
      paymentMethod === "razorpay"
        ? "bg-green-700 text-white"
        : "border-gray-300"
    }`}
  >
    Razorpay
  </button>

  <button
    onClick={() => setPaymentMethod("cod")}
    className={`border rounded-xl px-4 py-2 ${
      paymentMethod === "cod"
        ? "bg-green-700 text-white"
        : "border-gray-300"
    }`}
  >
    Cash on Delivery
  </button>
</div>



         
          {/* CARD DETAILS */}
{paymentMethod !== "cod" && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm mb-1">Name on Card</label>
      <input
        name="cardName"
        value={form.cardName}
        onChange={handleChange}
        className="input"
      />
    </div>

    <div>
      <label className="block text-sm mb-1">Card Number</label>
      <input
        name="cardNumber"
        value={form.cardNumber}
        onChange={handleChange}
        className="input"
        placeholder={
          paymentMethod === "stripe"
            ? "4242 4242 4242 4242"
            : "4111 1111 1111 1111"
        }
      />
    </div>

    <div>
      <label className="block text-sm mb-1">Exp Month</label>
      <input
        name="expMonth"
        value={form.expMonth}
        onChange={handleChange}
        className="input"
      />
    </div>

    <div>
      <label className="block text-sm mb-1">Exp Year</label>
      <input
        name="expYear"
        value={form.expYear}
        onChange={handleChange}
        className="input"
      />
    </div>

    <div>
      <label className="block text-sm mb-1">CVV</label>
      <input
        name="cvv"
        value={form.cvv}
        onChange={handleChange}
        className="input"
      />
    </div>
  </div>
)}


{paymentMethod === "cod" && (
  <div className="mt-8 bg-gray-50 p-6 rounded-2xl space-y-6">
    <h3 className="font-semibold text-green-800 underline text-underline-offset-2px text-lg">
      Billing Address for Cash on Delivery
    </h3>

    {/* SAME ADDRESS */}
    <label className="flex gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={codOption === "same"}
        onChange={() => setCodOption("same")}
      />
      <div>
        <p className="font-medium">Same as billing address</p>
        <p className="text-sm text-gray-600 bg-orange-50 border-2 border-orange-400 rounded-lg">
          {billingAddressText}
        </p>
        
      </div>
    </label>

    {/* NEW ADDRESS */}
    <label className="flex gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={codOption === "new"}
        onChange={() => setCodOption("new")}
      />
      <div className="w-full">
        <p className="font-medium mb-3">
          Enter new billing address
        </p>

        {codOption === "new" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
      name="address"
      value={codAddress.address}
      onChange={handleCodAddressChange}
      className="input"
      placeholder="Address"
    />
    <input
      name="city"
      value={codAddress.city}
      onChange={handleCodAddressChange}
      className="input"
      placeholder="City"
    />
    <input
      name="state"
      value={codAddress.state}
      onChange={handleCodAddressChange}
      className="input"
      placeholder="State"
    />
    <input
      name="zip"
      value={codAddress.zip}
      onChange={handleCodAddressChange}
      className="input"
      placeholder="Zip Code"
    />
  </div>
)}
      </div>
    </label>
  </div>
)}



          <button
            onClick={handlePayment}
            disabled={!isFormValid}
            className={`mt-8 w-full py-4 rounded-full text-white text-lg ${
              isFormValid
                ? "bg-green-700 hover:bg-green-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Pay ₹{total}
          </button>
        </div>



        

        {/* RIGHT SIDE */}
        <div className="bg-orange-50 p-8 shadow-gray-4 shadow-2xl rounded-3xl h-fit">
          <h3 className="text-lg text-green-800 underline text-underline-offset-2px font-semibold mb-4">
            Order Summary
          </h3>

          <div className="space-y-4">
  {cartItems.map((item) => (
    <div
      key={item._id}
      className="flex items-center gap-4"
    >
      {/* PRODUCT IMAGE */}
      <img
        src={item.image}
        alt={item.name}
        className="w-35 h-35 rounded-xl object-cover transition-all duration-300 ease-out
  hover:scale-105 shadow-lg shadow-gray-700"
      />

      {/* PRODUCT INFO */}
      <div className="flex-1">
        <p className="font-bold text-lg">{item.name}</p>
        <p className="text-xs text-gray-500">
          Qty: {item.qty}
        </p>
      </div>

      {/* PRICE */}
      <span className="text-sm font-medium">
        ₹{item.price * item.qty}
      </span>
    </div>
  ))}
</div>


          <hr className="my-4" />

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </div>

          <div className="flex justify-between font-semibold text-green-800 text-lg mt-3">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
           
      
      {/* ✅ PASTE POPUP HERE */}
      {showSuccess && (
       <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-2xl">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full border-2 border-orange-500 flex items-center justify-center">
                <span className="text-orange-500 text-2xl">✓</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-1">
              Hey {form.fullName || "there"},
            </p>
            <h1 className="text-xl font-bold text-green-700 mb-2">
           Payment Successful🎉</h1>
            <h2 className="text-xl font-bold mb-2">
              Your Order is Confirmed!
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              We’ll send you a shipping confirmation email as soon as your order ships.
            </p>

            <button
              onClick={() => navigate(`/order/${orderId}`)}
              className="bg-orange-600 hover:orange-pink-700 text-white px-6 py-2 rounded-full font-semibold"
            >
              CHECK STATUS
            </button>
          </div>
        </div>
      )}

  
    </div>
  );
}
