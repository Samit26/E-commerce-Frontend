import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // Convert pinCode to number for backend
    if (data.pinCode) data.pinCode = Number(data.pinCode);

    try {
      // console.log("Signup data:", data);
      const response = await axios.post(
        `${config.backendUrl}/api/users/createUser`,
        // `http://localhost:5000/api/users/createUser`,
        data
      );
      // console.log("Signup response:", response);
      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Signup successfully!");
        navigate("/");
      } else {
        toast.error("Error signing up. Please try again.");
      }
    } catch (error) {
      toast.error("Error signing up. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
      console.log("Request completed");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="text-white text-lg font-semibold">
              Signing Up...
            </span>
          </div>
        </div>
      )}
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Sign Up
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full rounded-md border border-gray-300 p-3"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-md border border-gray-300 p-3"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            className="w-full rounded-md border border-gray-300 p-3"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full rounded-md border border-gray-300 p-3"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full rounded-md border border-gray-300 p-3"
          />
          <input
            type="number"
            name="pinCode"
            placeholder="Pincode"
            className="w-full rounded-md border border-gray-300 p-3"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-md border border-gray-300 p-3"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 text-white p-3 font-semibold hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-gray-600">
          Already have an account?
          <Link to="/login" className="ml-2 text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
