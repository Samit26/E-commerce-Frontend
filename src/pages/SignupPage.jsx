import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../context/Product/ProductContext";

export default function SignupPage() {
  const { setUser } = useContext(ProductContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // console.log(data);
    try {
      const response = await axios.post(
        `${config.backendUrl}/api/users/createUser`,
        data
      );
      // console.log(response);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Signup successfully!");
        setUser(JSON.parse(localStorage.getItem("user")));
        navigate("/");
      } else {
        toast.error("Error signing up. Please try again.");
      }
    } catch (error) {
      toast.error("Error signing up. Please try again.");
      console.error("Error:", error);
    } finally {
      console.log("Request completed");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
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
            type="integer"
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
          >
            Sign Up
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
