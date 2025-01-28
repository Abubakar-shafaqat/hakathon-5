"use client";
import Sidebar from "../components/sidebar";
import { faGalacticRepublic } from "@fortawesome/free-brands-svg-icons";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdPeopleOutline } from "react-icons/md";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import BookingForm from "../components/pick&drops";
import AnalyticsDashboard from "../AnalyticsDashboard/page";

function Morecares() {
  const [carRentals, setCarRentals] = useState<Car[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarRentalData = async () => {
      try {
        const response = await fetch("https://678cc7fcf067bf9e24e83478.mockapi.io/carrental");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCarRentals(data);
      } catch (error) {
        console.error("Failed to fetch car rental data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarRentalData();
  }, []);

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar */}
      <div className="grid grid-cols-[15%_80%]">
      <div className=" h-full bg-white border-r border-gray-300">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1  p-8 bg-gray-100">
        <BookingForm />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="w-full max-w-[304px] mx-auto h-auto">
                  <CardHeader>
                    <CardTitle>
                      <Skeleton className="h-4 w-2/3" />
                    </CardTitle>
                    <CardDescription>
                      <Skeleton className="h-3 w-1/2" />
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center gap-4">
                    <Skeleton className="h-36 w-full" />
                    <div className="flex items-center space-x-1">
                      <Skeleton className="h-4 w-5" />
                      <Skeleton className="h-4 w-5" />
                      <Skeleton className="h-4 w-5" />
                    </div>
                  </CardContent>
                  <CardFooter className="w-full flex items-center justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-8 w-16" />
                  </CardFooter>
                </Card>
              ))
            : carRentals?.map((car: Car) => (
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
                      {car.price_per_day}/
                      <span className="text-gray-500">day</span>
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

      <AnalyticsDashboard />
    </div>
  );
}

export default Morecares;

type Car = {
  id: number;
  name: string;
  type: string;
  fuel_capacity: string;
  transmission: string;
  seating_capacity: string;
  price_per_day: string;
  image_url: string;
  tags: string[];
};
