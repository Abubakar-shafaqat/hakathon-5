"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCar, FaCreditCard, FaUser } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";

const Confirmation = () => {
  const searchParams = useSearchParams();
  const carid = searchParams.get("id"); // Get the car ID from the URL

  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [carDetails, setCarDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedPaymentDetails = localStorage.getItem("paymentDetails");
    const storedCarDetails = localStorage.getItem("carDetails");

    if (storedPaymentDetails && storedCarDetails) {
      setPaymentDetails(JSON.parse(storedPaymentDetails));
      setCarDetails(JSON.parse(storedCarDetails));
    }

    setLoading(false);
  }, []);

  const handleFinish = () => {
    router.push(`/BillingInfo?id=${carid}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!paymentDetails || !carDetails) {
    return <div className="flex justify-center items-center min-h-screen">No details found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-8 flex flex-col justify-center items-center">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Section - Payment Confirmation */}
        <div className="p-6 flex flex-col justify-between bg-gray-50">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Confirmation</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your payment! Your transaction has been successfully processed.
            </p>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
                <MdOutlinePayment className="mr-2 text-blue-600" /> Payment Details
              </h2>
              <p className="text-gray-700">
                <strong>Payment Method:</strong> {paymentDetails.paymentMethod}
              </p>
              {paymentDetails.details && (
                <div className="mt-2">
                  {paymentDetails.paymentMethod === "Credit Card" && (
                    <p className="text-gray-700">
                      <strong>Card Holder:</strong> {paymentDetails.details.cardHolder}
                    </p>
                  )}
                  {(paymentDetails.paymentMethod === "JazzCash" ||
                    paymentDetails.paymentMethod === "EasyPaisa") && (
                    <p className="text-gray-700">
                      <strong>Account Holder:</strong> {paymentDetails.details.accountHolderName}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleFinish}
            className="mt-4 py-3 px-6 text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition-all"
          >
            Next: Billing Information
          </button>
        </div>

        {/* Right Section - Car Details */}
        <div className="p-6 flex flex-col justify-center items-center bg-blue-100 relative">
          <img
            src={carDetails.image_url}
            alt={carDetails.name}
            className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
          />
          <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <FaCar className="mr-2 text-blue-600" /> Car Details
          </h2>
          <div className="text-gray-700 text-center">
            <p className="mb-2">
              <strong>Name:</strong> {carDetails.name}
            </p>
            <p className="mb-2">
              <strong>Type:</strong> {carDetails.type}
            </p>
            <p className="mb-2">
              <strong>Price per Day:</strong> {carDetails.price_per_day}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
