"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import jsPDF from "jspdf";
interface PaymentDetails {
  paymentMethod: string;
  details: {
    cardNumber?: string;
    expirationDate?: string;
    cardHolder?: string;
    mobileNumber?: string;
    accountHolderName?: string;
  };
}

interface BillingDetails {
  fullName: string;
  email: string;
  address: string;
}

interface CarDetails {
  name: string;
  type: string;
  price_per_day: string;
  image_url: string;
}
const OrderSummary = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carid = searchParams.get("id");

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [billingDetails, setBillingDetails] = useState<BillingDetails | null>(null);
  const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPaymentDetails = localStorage.getItem("paymentDetails");
    const storedBillingDetails = localStorage.getItem("billingDetails");

    if (storedPaymentDetails && storedBillingDetails) {
      setPaymentDetails(JSON.parse(storedPaymentDetails));
      setBillingDetails(JSON.parse(storedBillingDetails));
    } else {
      router.push("/PaymentForm");
    }
  }, [router]);

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

  const handleGoBack = () => {
    router.push("/");
  };

  const handleSaveInGallery = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Order Summary", 10, 10);

    doc.setFontSize(12);
    doc.text("Car Details:", 10, 20);
    doc.text(`- Name: ${carDetails?.name || "N/A"}`, 15, 30);
    doc.text(`- Type: ${carDetails?.type || "N/A"}`, 15, 40);
    doc.text(`- Price per Day: ${carDetails?.price_per_day || "N/A"}`, 15, 50);

    doc.text("Payment Details:", 10, 60);
    doc.text(`- Method: ${paymentDetails?.paymentMethod || "N/A"}`, 15, 70);
    if (paymentDetails?.paymentMethod === "Credit Card") {
      doc.text(`- Card Number: ${paymentDetails?.details?.cardNumber || "N/A"}`, 15, 80);
      doc.text(`- Expiration Date: ${paymentDetails?.details?.expirationDate || "N/A"}`, 15, 90);
      doc.text(`- Card Holder: ${paymentDetails?.details?.cardHolder || "N/A"}`, 15, 100);
    } else {
      doc.text(`- Mobile Number: ${paymentDetails?.details?.mobileNumber || "N/A"}`, 15, 80);
      doc.text(`- Account Holder Name: ${paymentDetails?.details?.accountHolderName || "N/A"}`, 15, 90);
    }

    doc.text("Billing Details:", 10, 120);
    doc.text(`- Full Name: ${billingDetails?.fullName || "N/A"}`, 15, 130);
    doc.text(`- Email: ${billingDetails?.email || "N/A"}`, 15, 140);
    doc.text(`- Address: ${billingDetails?.address || "N/A"}`, 15, 150);

    doc.save("order-summary.pdf");
  };

  if (!paymentDetails || !billingDetails || loading) {
    return <div className="flex justify-center items-center min-h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Order Summary</h2>

        {carDetails && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Car Details</h3>
            <div className="flex items-center space-x-4">
              <img
                src={carDetails.image_url}
                alt={carDetails.name}
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <div>
                <p className="text-gray-600">Name: {carDetails.name}</p>
                <p className="text-gray-600">Type: {carDetails.type}</p>
                <p className="text-gray-600">Price per Day: {carDetails.price_per_day}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
          <p className="text-gray-600">Method: {paymentDetails.paymentMethod}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Billing Details</h3>
          <p className="text-gray-600">Full Name: {billingDetails.fullName}</p>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Back to Home
          </button>
          <Link href={`/OrderTracking?id=${carid}`}>
            <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Track Order
            </button>
          </Link>
          <button
            onClick={handleSaveInGallery}
            className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          >
            Save in Gallery
          </button>
        </div>
      </div>
    </div>
  );
};


 

export default OrderSummary;
