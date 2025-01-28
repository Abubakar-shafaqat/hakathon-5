"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdPeopleOutline } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import BookingForm from "./pick&drops";
 
export default function Hero() {
 
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  type Car = {
    id: number;
    name: string;
    type: string;
    fuel_capacity: string;
    transmission: string;
    seating_capacity: string;
    price_per_day: string;
    image_url: string;
    tags?: string[];
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("https://678cc7fcf067bf9e24e83478.mockapi.io/carrental");
        const data: Car[] = await response.json();
        setTimeout(() => {
          setCars(data.slice(0, 12));
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="bg-[#f6f7f9] px-6 py-8 sm:px-12 lg:px-20 flex flex-col gap-10">
      {/* Hero Section */}
      <section className="flex flex-wrap sm:flex-nowrap gap-8 justify-center items-center">
        <img
          src="/bg2.png"
          alt="Background 1"
          className="w-full sm:w-1/2 h-auto object-cover rounded-lg shadow-lg"
        />
        <img
          src="/bg1.png"
          alt="Background 2"
          className="w-full sm:w-1/2 h-auto object-cover rounded-lg shadow-lg"
        />
      </section>

      {/* Booking Form */}
      <section className="px-6 sm:px-12 lg:px-16">
        <BookingForm />
      </section>

      {/* Popular Cars */}
      <section className="popular flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-700 font-bold text-2xl md:text-4xl">Popular Cars</h1>
          <Link href={"/morecars"}>
            <h1 className="text-[#3563e9] font-bold hover:underline decoration-[#3563e9]">
              View All
            </h1>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <Card
                key={index}
                className="w-full max-w-[304px] mx-auto h-auto animate-pulse bg-gray-200 shadow-md rounded-lg"
              >
                <CardHeader>
                  <CardTitle className="bg-gray-300 h-6 w-3/4 rounded-md"></CardTitle>
                  <CardDescription className="bg-gray-300 h-4 w-1/2 rounded-md mt-2"></CardDescription>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center gap-4">
                  <div className="bg-gray-300 h-[150px] w-full rounded-md"></div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-300 h-4 w-10 rounded-md"></div>
                    <div className="bg-gray-300 h-4 w-10 rounded-md"></div>
                    <div className="bg-gray-300 h-4 w-10 rounded-md"></div>
                  </div>
                </CardContent>
                <CardFooter className="w-full flex items-center justify-between">
                  <div className="bg-gray-300 h-6 w-20 rounded-md"></div>
                  <div className="bg-gray-300 h-6 w-20 rounded-md"></div>
                </CardFooter>
              </Card>
            ))
          : cars.map((car) => (
              <Card
                key={car.id}
                className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {car.name}
                    <button
                      onClick={() =>
                        wishlist.includes(car.id)
                          ? removeFromWishlist(car.id)
                          : addToWishlist(car.id)
                      }
                      className="relative z-10 p-1 rounded-full bg-white shadow-md"
                    >
                      {wishlist.includes(car.id) ? (
                        <FaHeart size={20} className="text-red-500" />
                      ) : (
                        <FaRegHeart size={20} className="text-gray-400" />
                      )}
                    </button>
                  </CardTitle>
                  <CardDescription>{car.type}</CardDescription>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center gap-4">
                  <Image
                    src={car.image_url}
                    alt={car.name}
                    width={220}
                    height={68}
                    className="rounded-md"
                  />
                  <div className="flex items-center justify-between gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon
                        icon={faGasPump}
                        className="text-gray-500"
                      />
                      <span className="text-sm">{car.fuel_capacity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon
                        icon={faGasPump}
                        className="text-gray-500"
                      />
                      <span className="text-sm">{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MdPeopleOutline size={20} className="text-gray-500" />
                      <span className="text-sm">{car.seating_capacity}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="w-full flex items-center justify-between p-4">
                  <p className="text-gray-700 font-semibold">{car.price_per_day}</p>
                  <button className="bg-[#3563e9] hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300">
                    <Link href={`/morecars/id?id=${car.id}`}>Rent Now</Link>
                  </button>
                </CardFooter>
              </Card>
            ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="bg-[#3563e9] hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
          <Link href="/morecars" className="w-full h-full">
            More Cars
          </Link>
        </button>
      </div>
    </div>
  );
}
