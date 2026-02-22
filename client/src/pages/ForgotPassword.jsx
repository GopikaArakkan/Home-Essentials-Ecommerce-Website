import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; 
// or "../../api" depending on file location // ✅ ADD THIS

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  const handleSendOTP = async () => {
    if (!isValid) return;

    try {
      const { data } = await api.post(
        "/api/users/forgot-password",
        { email }
      );

      alert(data.message); // "OTP sent (use 123456)"

      // ✅ save email for reset-password step
      localStorage.setItem("resetEmail", email);

      navigate("/verify-otp");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl w-80 shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          className="border w-full p-2 mb-4 rounded"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSendOTP}
          disabled={!isValid}
          className={`w-full py-2 rounded text-white ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}
