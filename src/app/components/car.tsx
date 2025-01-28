"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdPeopleOutline } from "react-icons/md";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useWishlist } from "../context/WishlistContext";

// Define the Car type
type Car = {
  id: number;
  name: string;
  type: string;
  fuel_capacity: string;
  transmission: string;
  seating_capacity: string;
  price_per_day: string;
  image_url: string;
  tags?: string[]; // Optional field
};

function Morecars() {
  const [cars, setCars] = useState<Car[]>([]); // Specify the type of `cars` as an array of `Car`
  
          const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("https://678cc7fcf067bf9e24e83478.mockapi.io/carrental");
        const data: Car[] = await response.json(); // Specify the type of `data` as an array of `Car`
        setCars(data.slice(0, 12)); // Limit to 12 cars
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {cars.map((car) => (
        <Card key={car.id} className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between">
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
            <Image src={car.image_url} alt={car.name} width={220} height={68} />
            <div className="flex items-center space-x-2">
              <div className="flex">
                <FontAwesomeIcon icon={faGasPump} className="text-gray-400" style={{ width: '20px', height: '20px' }} />
                <span className="md:text-sm text-xs flex">{car.fuel_capacity}</span>
              </div>
              <div className="flex">
                <FontAwesomeIcon icon={faGasPump} className="text-gray-400" style={{ width: '20px', height: '20px' }} />
                <span className="md:text-sm text-xs flex">{car.transmission}</span>
              </div>
              <div className="flex">
                <MdPeopleOutline size={30} className="text-gray-400" />
                <span className="md:text-sm text-xs flex">{car.seating_capacity}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="w-full flex items-center justify-between">
            <p>
              {car.price_per_day}
            </p>
            <button className="bg-[#3563e9] p-2 text-white rounded-md">
              <a href={`/morecars/${car.id}`}>Rent Now</a>
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Morecars;