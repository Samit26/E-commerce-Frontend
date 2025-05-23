import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 p-6 text-center">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-500 mt-2">The page you’re looking for doesn’t exist.</p>
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/")} // Redirect back to home
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;