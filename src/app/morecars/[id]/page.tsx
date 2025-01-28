"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdStarHalf } from "react-icons/io";
import { MdOutlineStar, MdPeopleOutline } from "react-icons/md";
import AddReviews from "../../components/addreviews";;
import Sidebar from "../../components/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/src/components/ui/card";
import { faGalacticRepublic } from "@fortawesome/free-brands-svg-icons";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useWishlist } from "../../context/WishlistContext";

// Define the type for the car object
interface Car {
  tags: string[];
  id: number;
  name: string;
  description: string;
  type: string;
  seating_capacity: number;
  transmission: string;
  fuel_capacity: number;
  price_per_day: string;
  image_url: string;
}

export default function Car() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [suggestedCars, setSuggestedCars] = useState<Car[]>([]);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(
          "https://678cc7fcf067bf9e24e83478.mockapi.io/carrental"
        );
        const allCars: Car[] = await res.json();
        const car = allCars.find((item) => item.id === parseInt(id!, 10));

        if (car) {
          setSelectedCar(car);

          // Exclude the selected car to suggest others
          const suggestions = allCars.filter((item) => item.id !== car.id).slice(0, 12);
          setSuggestedCars(suggestions);
        } else {
          setError("Car not found.");
        }
      } catch (err) {
        console.error("Error fetching car:", err);
        setError(`Failed to fetch car with ID: ${id}`);
      }
    };

    if (id) {
      fetchCar();
    } else {
      setError("No car ID provided.");
    }
  }, [id]);

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  if (!selectedCar) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading car details...
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-2/3">
        <div className="flex flex-col md:flex-row mt-10">
          {/* Left Section: Car Details */}
          <div className="md:w-1/2 ">
            <div className="bg-[url('/bg3.png')] p-6 text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Sports car with the best design and acceleration
              </h2>
              <p className="mb-6">
                Safety and comfort while driving a futuristic and elegant sports car.
              </p>
              <img
                src={selectedCar?.image_url || "/placeholder.png"}
                alt={selectedCar?.name}
                className="w-full rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Right Section: Car Information */}
          <div className="md:w-1/2 p-6 justify-end">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedCar?.name || "Car Name"}
            </h2>
            <div className="flex items-center mb-4">
              <div className="flex space-x-1 text-yellow-500">
                <MdOutlineStar size={20} />
                <MdOutlineStar size={20} />
                <MdOutlineStar size={20} />
                <MdOutlineStar size={20} />
                <IoMdStarHalf size={20} />
              </div>
              <span className="text-gray-600 text-sm ml-2">440+ Reviews</span>
            </div>
            <p className="text-gray-600 mb-4">{selectedCar?.description}</p>
            <div className="flex flex-wrap gap-4 text-gray-700 mb-6">
              <p>
                <strong>Type Car:</strong> {selectedCar?.type || "Type"}
              </p>
              <p>
                <strong>Capacity:</strong> {selectedCar?.seating_capacity}
              </p>
              <p>
                <strong>Transmission:</strong> {selectedCar?.transmission}
              </p>
              <p>
                <strong>Fuel Capacity:</strong> {selectedCar?.fuel_capacity}
              </p>
              <p>
              {selectedCar?.tags}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-blue-900">
                  {selectedCar?.price_per_day}{" "}
                  <span className="text-sm text-gray-500">/ day</span>
                </p>
              </div>
              <Link href={`/payment?id=${selectedCar?.id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
                  Rent Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews under the car details */}
        <AddReviews />

        {/* "You May Also Like" Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedCars.map((car) => (
              <Card
                key={car.id}
                className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between"
              >
                <CardHeader>
                  <CardTitle className="w-full flex items-center justify-between">
                    {car.name}
                    <button
                      onClick={() =>
                        wishlist.includes(car.id)
                          ? removeFromWishlist(car.id)
                          : addToWishlist(car.id)
                      }
                      className="relative z-10 p-1 rounded-full bg-white"
                    >
                      {wishlist.includes(car.id) ? (
                        <FaHeart size={20} className="text-red-500" />
                      ) : (
                        <FaRegHeart size={20} className="text-gray-500" />
                      )}
                    </button>
                  </CardTitle>
                  <CardDescription>{car.type}</CardDescription>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center gap-4">
                  <img
                    src={car.image_url}
                    alt={car.name}
                    width={220}
                    height={68}
                  />
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon
                      icon={faGasPump}
                      className="text-gray-400"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <span className="text-sm">{car.fuel_capacity}</span>
                    <FontAwesomeIcon
                      icon={faGalacticRepublic}
                      className="text-gray-400"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <span className="text-sm">{car.transmission}</span>
                    <MdPeopleOutline size={30} className="text-gray-400" />
                    <span className="text-sm flex">
                      {car.seating_capacity}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="w-full flex items-center justify-between">
                  <p>
                    {car.price_per_day}/<span className="text-gray-500">day</span>
                  </p>
                  <button className="bg-[#3563e9] p-2 text-white rounded-md">
                    <Link href={`/morecars/id?id=${car.id}`}>Rent Now</Link>
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

    
      </div>
    </div>
  );
}
