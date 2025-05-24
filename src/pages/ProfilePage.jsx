import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  // Fetch user data from localStorage
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    createdAt: "",
  });

  // State to manage which field is being edited
  const [editField, setEditField] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("user"));
    if (!userObj || !userObj.user) {
      navigate("/login");
      return;
    }
    setUserData({
      name: userObj.user.name || "",
      email: userObj.user.email || "",
      address: userObj.user.address || "",
      city: userObj.user.city || "",
      state: userObj.user.state || "",
      pinCode: userObj.user.pinCode || "",
      createdAt: userObj.user.createdAt || "",
    });
  }, [navigate]);

  // Handle input change for editable fields
  const handleInputChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  // Save changes and exit edit mode
  const saveEdit = () => {
    setEditField(null);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-10 mt-8 px-3">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 space-y-10 border border-blue-100">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-8 relative">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow transition-colors"
          >
            Logout
          </button>
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-5xl font-extrabold shadow-lg border-4 border-white">
            {userData.name ? userData.name[0] : "?"}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
              {userData.name || "Not provided"}
            </h1>
            <p className="text-base text-gray-500 mb-1 flex items-center justify-center md:justify-start gap-2">
              <span className="inline-block bg-blue-100 text-blue-600 rounded px-2 py-0.5 text-xs font-semibold">
                {userData.email || "Email not provided"}
              </span>
            </p>
            <p className="text-xs text-gray-400">
              Joined:{" "}
              {userData.createdAt
                ? new Date(userData.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        {/* Personal Details Section */}
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-4 border-b pb-2">
            Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(userData).map(([key, value]) =>
              key !== "name" && key !== "email" && key !== "createdAt" ? (
                <div
                  key={key}
                  className="flex items-start gap-3 bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-100"
                >
                  <div className="mt-1">
                    {/* Icon for each field (optional, can be replaced with better icons) */}
                    <span className="w-6 h-6 bg-blue-200 rounded-full text-blue-700 flex items-center justify-center font-bold text-lg">
                      {key[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    {editField === key ? (
                      <input
                        type="text"
                        value={value || ""}
                        onChange={(e) => handleInputChange(e, key)}
                        className="text-sm font-medium text-gray-800 border-2 border-blue-300 rounded-md px-3 py-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow"
                        autoFocus
                      />
                    ) : (
                      <p className="text-base font-medium text-gray-800 mt-1">
                        {value || (
                          <span className="italic text-gray-400">
                            Not provided
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      editField === key ? saveEdit() : setEditField(key)
                    }
                    className={`ml-2 mt-1 rounded-full p-1 transition-colors duration-200 ${
                      editField === key
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                    }`}
                    title={editField === key ? "Save" : "Edit"}
                  >
                    {editField === key ? (
                      <AiOutlineCheck size={20} />
                    ) : (
                      <AiOutlineEdit size={20} />
                    )}
                  </button>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
