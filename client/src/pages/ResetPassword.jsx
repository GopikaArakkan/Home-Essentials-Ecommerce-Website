import api from "../api"; 
// or "../../api" depending on file location
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();



const handleReset = async () => {
  if (!password || !confirm) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  const email = localStorage.getItem("resetEmail");

  if (!email) {
    alert("Reset session expired");
    navigate("/forgot-password");
    return;
  }

  try {
    const { data } = await api.post(
      "api/users/reset-password",
      { email, password }
    );

    alert(data.message);

    localStorage.removeItem("resetEmail");
    navigate("/login");
  } catch (error) {
    alert(error.response?.data?.message || "Reset failed");
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl w-80 shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          className="border w-full p-2 mb-3 rounded"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="border w-full p-2 mb-4 rounded"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
