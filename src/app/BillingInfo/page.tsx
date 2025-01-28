"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BillingInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carid = searchParams.get("id"); // Get the car ID from the URL

  const [billingDetails, setBillingDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [carDetails, setCarDetails] = useState<any>(null); // State to store car details
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch car details from the API
  useEffect(() => {
    if (carid) {
      fetch(`https://678cc7fcf067bf9e24e83478.mockapi.io/carrental?id=${carid}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setCarDetails(data[0]); // Extract the first item from the array
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store billing details in localStorage
    localStorage.setItem("billingDetails", JSON.stringify(billingDetails));

    // Redirect to the OrderSummary page
    router.push(`/OrderSummary?id=${carid}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-xl font-medium">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing Information</h2>
          <p className="text-gray-600 mb-8">
            Please provide your billing information to proceed with the order.
          </p>

          {/* Car Details */}
          {carDetails ? (
            <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center">
              <img
                src={carDetails.image_url}
                alt={carDetails.name}
                className="w-24 h-24 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/default-car-image.jpg"; // Fallback image
                }}
              />
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-800">{carDetails.name}</p>
                <p className="text-gray-600">
                  <strong>Type:</strong> {carDetails.type}
                </p>
                <p className="text-gray-600">
                  <strong>Price per Day:</strong> ${carDetails.price_per_day}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No car details available</p>
          )}

          {/* Billing Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={billingDetails.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={billingDetails.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={billingDetails.address}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={billingDetails.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={billingDetails.zipCode}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-8 py-3 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Next: Order Summary
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillingInfo;
