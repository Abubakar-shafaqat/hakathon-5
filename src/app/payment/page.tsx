"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const PaymentForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carid = searchParams.get("id");

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cardHolder: "",
    cvc: "",
  });
  const [mobileDetails, setMobileDetails] = useState({
    mobileNumber: "",
    accountHolderName: "",
  });
  const [carDetails, setCarDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (carid) {
      fetch(`https://678cc7fcf067bf9e24e83478.mockapi.io/carrental?id=${carid}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setCarDetails(data[0]);
          } else {
            console.error("No car found with the given ID");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching car details:", error);
          setLoading(false);
        });
    }
  }, [carid]);

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handleMobileDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMobileDetails({
      ...mobileDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let details;
    if (paymentMethod === "Credit Card") {
      if (cardDetails.cardNumber.length !== 16) {
        alert("Card number must be exactly 16 digits.");
        return;
      }
      details = cardDetails;
    } else if (paymentMethod === "JazzCash" || paymentMethod === "EasyPaisa") {
      if (!mobileDetails.mobileNumber.startsWith("+92") || mobileDetails.mobileNumber.length !== 13) {
        alert("Mobile number must start with +92 followed by 10 digits.");
        return;
      }
      if (!mobileDetails.accountHolderName) {
        alert("Account holder name is required.");
        return;
      }
      details = mobileDetails;
    }

    localStorage.setItem("paymentDetails", JSON.stringify({ paymentMethod, details }));
    localStorage.setItem("carDetails", JSON.stringify(carDetails));

    router.push(`/Confirmation?id=${carid}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-xl font-bold">Loading car details...</div>;
  }

  if (!carDetails) {
    return <div className="flex justify-center items-center min-h-screen text-xl font-bold">No car details found.</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white">Payment Details</h1>
          <p className="text-white text-sm mt-2">
            Secure your car rental by completing your payment details below.
          </p>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Car Details</h2>
          <div className="flex gap-6 items-center mb-8">
            <img
              src={carDetails.image_url}
              alt={carDetails.name}
              className="w-32 h-32 object-cover rounded-md shadow-md"
              onError={(e) => {
                e.currentTarget.src = "/default-car-image.jpg";
              }}
            />
            <div>
              <p className="text-lg font-medium">{carDetails.name}</p>
              <p className="text-gray-700">Type: {carDetails.type}</p>
              <p className="text-gray-700">Price per Day: ${carDetails.price_per_day}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { method: "Credit Card", img: "/visa.jpg" },
                { method: "JazzCash", img: "/jazzcash.webp" }, // Correct image path
                { method: "EasyPaisa", img: "/easypaisa.webp" }, // Correct image path
              ].map(({ method, img }) => (
                <label
                  key={method}
                  className={`cursor-pointer flex items-center gap-4 p-4 border rounded-lg shadow-sm ${
                    paymentMethod === method ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    className="hidden"
                    checked={paymentMethod === method}
                    onChange={() => handlePaymentMethodChange(method)}
                  />
                  <img src={img} alt={method} className="w-8 h-8" />
                  <span className="text-lg font-medium">{method}</span>
                </label>
              ))}
            </div>

            {paymentMethod === "Credit Card" && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Card Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                    maxLength={16}
                  />
                  <input
                    type="text"
                    name="expirationDate"
                    placeholder="Expiration Date (MM/YY)"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={cardDetails.expirationDate}
                    onChange={handleCardDetailsChange}
                  />
                  <input
                    type="text"
                    name="cardHolder"
                    placeholder="Card Holder Name"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={cardDetails.cardHolder}
                    onChange={handleCardDetailsChange}
                  />
                  <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={cardDetails.cvc}
                    onChange={handleCardDetailsChange}
                  />
                </div>
              </div>
            )}

            {(paymentMethod === "JazzCash" || paymentMethod === "EasyPaisa") && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Mobile Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number (+92XXXXXXXXXX)"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={mobileDetails.mobileNumber}
                    onChange={handleMobileDetailsChange}
                  />
                  <input
                    type="text"
                    name="accountHolderName"
                    placeholder="Account Holder Name"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={mobileDetails.accountHolderName}
                    onChange={handleMobileDetailsChange}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Confirm and Proceed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
