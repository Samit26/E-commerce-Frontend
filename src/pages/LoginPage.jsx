import axios from "axios";
import config from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // console.log(data);
    try {
      const response = await axios.post(
        `${config.backendUrl}/api/users/login`,
        data
      );
      // console.log(response);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));

        toast.success("Login successfully!");
        navigate("/");
      } else {
        toast.error("Error logging in. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error logging in. Please try again.");
    } finally {
      console.log("Request completed");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
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
            className="w-full rounded-md bg-blue-600 text-white p-3 font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account?
          <Link to="/signup" className="ml-2 text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
