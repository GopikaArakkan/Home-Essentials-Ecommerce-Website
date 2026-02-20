import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = emailRegex.test(email);
  const isDisabled = !isEmailValid || !password;
 

  const handleLogin = async () => {
  if (isDisabled) return;

  const result = await login(email, password); // 🔥 await

  if (!result.success) {
    alert(result.message);
    return;
  }

  // Admin OTP flow stays EXACTLY the same
  if (email === "admin@example.com") {
  alert("OTP sent (use 123456)");
  navigate("/verify-otp", {
    state: { purpose: "admin-login" },
  });
} else {
  navigate("/");
}

};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-orange-50 p-15 rounded-xl w-150 shadow-gray-400 shadow-2xl border-2 border-orange-400">
        <h2 className="text-4xl text-green-800 font-bold mb-8 text-center">
          Login
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          className="border w-full p-2 mb-2 rounded"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!isEmailValid && email && (
          <p className="text-xs text-red-500 mb-2">
            Enter a valid email (example@gmail.com)
          </p>
        )}


        {/* PASSWORD */}
        <div className="relative mb-4">
  <input
    type={showPassword ? "text" : "password"}
    className="border w-full p-2 pr-10 rounded"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  {/* 👁️ Eye toggle */}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showPassword ? "🙈" : "👁️"}
  </button>
</div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={isDisabled}
          className={`w-full py-2 rounded text-white transition ${
            isDisabled
              ? "bg-orange-50 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-800"
          }`}
        >
          Log In
        </button>

        {/* FORGOT PASSWORD */}
        <p
          className="text-sm text-center mt-3 text-green-600 cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </p>

        {/* REGISTER */}
        <p className="text-sm text-center mt-2">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-600 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
