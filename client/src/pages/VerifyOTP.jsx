import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 🔹 add useLocation

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // 🔹 add this

  const handleVerify = () => {
  if (otp === "123456") {

    // ✅ Admin login OTP → go HOME
    if (location.state?.purpose === "admin-login") {
      navigate("/", { replace: true });
      return;
    }

    // ✅ Forgot password OTP → reset password
    navigate("/reset-password", { replace: true });

  } else {
    alert("Invalid OTP");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl w-80 shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Verify OTP
        </h2>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="border w-full p-2 mb-4 rounded text-center tracking-widest"
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        />

        <button
          onClick={handleVerify}
          className="w-full py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
