import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";


export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isEmailValid = emailRegex.test(email);
  const isNameValid = nameRegex.test(firstName) && nameRegex.test(lastName);

  // 🔥 BUTTON ENABLE RULE
 const isDisabled = !isEmailValid || !isNameValid || !password;


  // 🔐 Password strength (info only)
  const getPasswordStrength = () => {
    if (!password) return "";
    if (password.length < 6) return "Weak password";
    if (password.length < 10) return "Medium password";
    return "Strong password";
  };

  
const handleRegister = async () => {
  if (isDisabled) return;

  try {
    await axios.post("http://localhost:5000/api/users/register", {
      name: `${firstName} ${lastName}`,
      email,
      password,
    });

    alert("Registration successful. Please login.");
    navigate("/login");
  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
  }
};





  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl w-96 shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create Account
        </h2>

        <input
          className="border w-full p-2 mb-3 rounded"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="border w-full p-2 mb-3 rounded"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          className={`border w-full p-2 mb-3 rounded ${
            email && !isEmailValid ? "border-red-500" : ""
          }`}
          placeholder="Email (example@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!isEmailValid && email && (
          <p className="text-red-500 text-xs mb-2">
            Enter a valid email address
          </p>
        )}

        {/* PASSWORD FIELD */}
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            className="border w-full p-2 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {password && (
          <p className="text-xs text-gray-500 mb-3">
            {getPasswordStrength()}
          </p>
        )}

        <button
          disabled={isDisabled}
          onClick={handleRegister}
          className={`w-full py-2 rounded text-white transition ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
