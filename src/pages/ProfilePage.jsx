import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";

const ProfilePage = () => {
  // Mock user data
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    username: "johndoe123",
    contactNumber: "+1 234 567 8901",
    email: "johndoe@example.com",
    address: "",
    gender: "Male",
    bio: "Software engineer with a passion for building scalable web applications.",
    dob: "",
  });

  // Mock orders data
  const [orders] = useState([]);

  // State to manage which field is being edited
  const [editField, setEditField] = useState(null);

  // Handle input change for editable fields
  const handleInputChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  // Save changes and exit edit mode
  const saveEdit = () => {
    setEditField(null);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto h-max overflow-hidden mt-8 pt-10 md:mt-10 md:px-16 min-h-screen flex flex-col items-center py-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-6 space-y-10">

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {userData.fullName ? userData.fullName[0] : "?"}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {userData.fullName || "Not provided"}
            </h1>
            <p className="text-sm text-gray-500">
              {userData.username ? `@${userData.username}` : "Username not provided"}
            </p>
            <p className="text-xs text-gray-500">{userData.bio || "No bio available"}</p>

          </div>
        </div>

        {/* Personal Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(userData).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                {editField === key ? (
                  <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => handleInputChange(e, key)}
                    className="text-sm font-medium text-gray-800 border border-gray-300 rounded-md px-2 py-1 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {value || "Not provided"}
                  </p>
                )}
              </div>
              <button
                onClick={() =>
                  editField === key ? saveEdit() : setEditField(key)
                }
                className="text-gray-500 hover:text-blue-500 ml-4"
              >
                {editField === key ? (
                  <AiOutlineCheck size={20} />
                ) : (
                  <AiOutlineEdit size={20} />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Orders Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Your Orders</h2>
          {orders.length === 0 ? (
            <p className="text-sm text-gray-500">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500">
                      Order ID:{" "}
                      <span className="font-semibold text-gray-800">
                        {order.id}
                      </span>
                    </span>
                    <span
                      className={`text-xs font-medium ${order.status === "Delivered"
                        ? "text-green-500"
                        : "text-blue-500"
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    Order Date: {order.date}
                  </p>
                  <div className="space-y-1 mb-2">
                    {order.items.map((item, index) => (
                      <p
                        key={index}
                        className="text-xs text-gray-700 flex justify-between"
                      >
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                      </p>
                    ))}
                  </div>
                  <p className="text-xs font-medium text-gray-800">
                    Total: <span className="font-bold">{order.total}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;