import React, { useState } from "react";

const PaymentsPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("upi"); // Track selected payment method
  const [upiId, setUpiId] = useState(""); // UPI ID input
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  }); // Card details input

  const handlePayment = () => {
    if (selectedMethod === "upi" && upiId) {
      alert(`Payment initiated through UPI: ${upiId}`);
    } else if (
      selectedMethod === "card" &&
      cardDetails.cardNumber &&
      cardDetails.expiry &&
      cardDetails.cvv &&
      cardDetails.name
    ) {
      alert("Payment initiated using Credit/Debit Card.");
    } else if (selectedMethod === "cod") {
      alert("Cash on Delivery selected.");
    } else if (selectedMethod === "qr") {
      alert("Payment via QR Code initiated.");
    } else {
      alert("Please provide required details for the selected payment method.");
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto h-max overflow-hidden mt-8 pt-10 md:mt-10 md:px-16 min-h-screen bg-gray-100 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4">
        {/* Parent Div for All Content */}
        <div className="flex">
          {/* Payment Method Sidebar */}
          <div className="w-1/10 p-2 border-r border-gray-200">
            <h2 className="text-sm font-semibold mb-2">Payment Methods</h2>
            <ul className="space-y-2">
              <li>
                <button
                  className={`w-full text-left p-1 rounded-md text-sm ${selectedMethod === "upi" ? "bg-blue-100" : "hover:bg-gray-200"
                    }`}
                  onClick={() => setSelectedMethod("upi")}
                >
                  UPI
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-1 rounded-md text-sm ${selectedMethod === "card" ? "bg-blue-100" : "hover:bg-gray-200"
                    }`}
                  onClick={() => setSelectedMethod("card")}
                >
                  Credit/Debit Card
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-1 rounded-md text-sm ${selectedMethod === "qr" ? "bg-blue-100" : "hover:bg-gray-200"
                    }`}
                  onClick={() => setSelectedMethod("qr")}
                >
                  QR Code
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-1 rounded-md text-sm ${selectedMethod === "cod" ? "bg-blue-100" : "hover:bg-gray-200"
                    }`}
                  onClick={() => setSelectedMethod("cod")}
                >
                  Cash on Delivery (COD)
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-1 rounded-md text-sm ${selectedMethod === "other"
                      ? "bg-blue-100"
                      : "hover:bg-gray-200"
                    }`}
                  onClick={() => setSelectedMethod("other")}
                >
                  Other Methods
                </button>
              </li>
            </ul>
          </div>

          {/* Payment Details Section */}
          <div className="w-9/10 p-4">
            <h1 className="text-lg font-semibold mb-4">Payments Page</h1>

            {/* Payment Details */}
            {selectedMethod === "upi" && (
              <div className="mb-4">
                <h2 className="text-sm font-medium mb-2">Enter UPI ID:</h2>
                <input
                  type="text"
                  placeholder="e.g., yourname@bank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            )}

            {selectedMethod === "card" && (
              <div className="mb-4">
                <h2 className="text-sm font-medium mb-2">
                  Enter Credit/Debit Card Details:
                </h2>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Card Number"
                    maxLength="16"
                    value={cardDetails.cardNumber}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                    }
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY)"
                    maxLength="5"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, expiry: e.target.value })
                    }
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    maxLength="3"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvv: e.target.value })
                    }
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Name on Card"
                    value={cardDetails.name}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, name: e.target.value })
                    }
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            )}

            {selectedMethod === "qr" && (
              <div className="flex flex-col items-center mb-4">
                <h2 className="text-sm font-medium mb-2">Scan the QR Code:</h2>
                <div className="w-40 h-40 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                  [QR Code Placeholder]
                </div>
              </div>
            )}

            {selectedMethod === "cod" && (
              <div className="mb-4 text-green-500 font-medium text-sm">
                <h2>Cash on Delivery selected. No additional details required.</h2>
              </div>
            )}

            {selectedMethod === "other" && (
              <div className="mb-4">
                <h2 className="text-sm font-medium mb-2">Other Payment Methods:</h2>
                <p className="text-gray-600 text-sm">
                  Additional payment methods can be added here (e.g., Net Banking,
                  Wallets, etc.).
                </p>
              </div>
            )}

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              className="mt-4 w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition text-sm"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;