"use client"
import Sidebar from "../components/sidebar";
import { faGalacticRepublic } from "@fortawesome/free-brands-svg-icons";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdPeopleOutline } from "react-icons/md";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import BookingForm from "../components/pick&drops";

 function Morecares() {
   const [data, setdata] = useState<Car[]>([]);
      useEffect(() => {
        const fetchCars = async () => {
          const response = await fetch("https://678cc7fcf067bf9e24e83478.mockapi.io/carrental");
          const data = await response.json();
          setdata(data);  // Set the fetched data to state
        };
    
        fetchCars();
      }, []);
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Filter the cars based on car type being "Sport"
  const filteredData = data.filter((car: Car) => car.type === "Diesel");

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="w-[2%] md:w-[200px] sm:w-[2%] h-full bg-white border-r border-gray-300">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8 bg-gray-100">
      <BookingForm/>
      
        <div className="flex">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {filteredData.length > 0 ? (
              filteredData.map((car: Car) => (
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
                    <img src={car.image_url} alt={car.name} width={220} height={68} />
                    <div className="flex items-center space-x-1">
                      <FontAwesomeIcon icon={faGasPump} className="text-gray-400" style={{ width: '20px', height: '20px' }} />
                      <span className="text-sm">{car.fuel_capacity}</span>
                      <FontAwesomeIcon icon={faGalacticRepublic} className="text-gray-400" style={{ width: '20px', height: '20px' }} />
                      <span className="text-sm">{car.transmission}</span>
                      <MdPeopleOutline size={30} className="text-gray-400" />
                      <span className="text-sm flex">{car.seating_capacity}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="w-full flex items-center justify-between">
                    <p>
                      {car.price_per_day}/<span className="text-gray-500">day</span>
                    </p>
                    <button className="bg-[#3563e9] p-2 text-white rounded-md">
                      <a href={`/morecars/id?id=${car.id}`}>Rent Now</a>
                    </button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No cars available</p>
            )}
          </div>
        </div>
      </div>
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


// import { useState, useEffect } from "react";
// import { GoArrowDown, GoArrowUp } from "react-icons/go";
// import Sidebar from "../components/sidebar";
// import { faGalacticRepublic } from "@fortawesome/free-brands-svg-icons";
// import { faGasPump } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { MdPeopleOutline } from "react-icons/md";
// import LikeButton from "../components/LikeButton";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
// import Image from "next/image";

// async function Morecares() {
//   const [loading, setLoading] = useState(true);
//   const [filteredData, setFilteredData] = useState<Car[]>([]);
//   const [isPickup, setIsPickup] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://678cc7fcf067bf9e24e83478.mockapi.io/carrental");
//         const data = await response.json();
//         // Filter the cars based on car type being "Diesel"
//         const filteredCars = data.filter((car: Car) => car.type === "Diesel");
//         setFilteredData(filteredCars);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const swapSections = () => {
//     setIsPickup(!isPickup);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex h-screen w-full overflow-hidden">
//       <div className="w-[2%] md:w-[200px] sm:w-[2%] h-full bg-white border-r border-gray-300">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto p-8 bg-gray-100">
//         <div className="lg:flex items-center sm:grid sm:grid-cols-1 justify-center gap-12">
//           {/* Pick-Up Section */}
//           <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-6 w-full lg:w-[40%]">
//             <div className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 id="pickup"
//                 name="bookingType"
//                 className="text-blue-500"
//                 defaultChecked
//               />
//               <label htmlFor="pickup" className="font-medium text-gray-700">
//                 Pick - Up
//               </label>
//             </div>
//             <div className="flex gap-4">
//               <div className="flex flex-col w-1/3">
//                 <label className="font-medium text-gray-600">Locations</label>
//                 <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700">
//                   <option>Select your city</option>
//                 </select>
//               </div>
//               <div className="flex flex-col w-1/3">
//                 <label className="font-medium text-gray-600">Date</label>
//                 <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700">
//                   <option>Select your date</option>
//                 </select>
//               </div>
//               <div className="flex flex-col lg:w-[100px] w-1/3">
//                 <label className="font-medium text-gray-600">Time</label>
//                 <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700">
//                   <option>Select your Time</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Swap Button */}
//           <div className="flex items-center justify-center">
//             <button
//               onClick={swapSections}
//               className="w-14 h-14 bg-blue-500 text-white rounded-xl shadow-md flex items-center justify-center"
//               aria-label="Swap Pick-Up and Drop-Off"
//             >
//               <GoArrowDown size={20} />
//               <GoArrowUp size={20} />
//             </button>
//           </div>

//           {/* Drop-Off Section */}
//           <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-6 w-full lg:w-[40%]">
//             <div className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 id="dropoff"
//                 name="bookingType"
//                 className="text-blue-500"
//               />
//               <label htmlFor="dropoff" className="font-medium text-gray-700">
//                 Drop - Off
//               </label>
//             </div>
//             <div className="flex gap-4">
//               <div className="flex flex-col w-1/3">
//                 <label className="font-medium text-gray-600">Locations</label>
//                 <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700">
//                   <option>Select your city</option>
//                 </select>
//               </div>
//               <div className="flex flex-col w-1/3">
//                 <label className="font-medium text-gray-600">Date</label>
//                 <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700">
//                   <option>Select your date</option>
//                 </select>
//               </div>
//               <div className="flex flex-col lg:w-[100px] w-1/3">
//                 <label className="font-medium text-gray-600">Time</label>
//                 <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700">
//                   <option>Select your Time</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
      
//         <div className="flex">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
//             {filteredData.length > 0 ? (
//               filteredData.map((car: Car) => (
//                 <Card key={car.id} className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between">
//                   <CardHeader>
//                     <CardTitle className="w-full flex items-center justify-between">
//                       {car.name}
//                       <LikeButton />
//                     </CardTitle>
//                     <CardDescription>{car.type}</CardDescription>
//                   </CardHeader>
//                   <CardContent className="w-full flex flex-col items-center justify-center gap-4">
//                     <Image src={car.image_url} alt={car.name} width={220} height={68} />
//                     <div className="flex items-center space-x-1">
//                       <FontAwesomeIcon icon={faGasPump} className="text-gray-400" style={{ width: '20px', height: '20px' }} />
//                       <span className="text-sm">{car.fuel_capacity}</span>
//                       <FontAwesomeIcon icon={faGalacticRepublic} className="text-gray-400" style={{ width: '20px', height: '20px' }} />
//                       <span className="text-sm">{car.transmission}</span>
//                       <MdPeopleOutline size={30} className="text-gray-400" />
//                       <span className="text-sm flex">{car.seating_capacity}</span>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="w-full flex items-center justify-between">
//                     <p>
//                       {car.price_per_day}/<span className="text-gray-500">day</span>
//                     </p>
//                     <button className="bg-[#3563e9] p-2 text-white rounded-md">
//                       <a href={`/morecars/${car.id}`}>Rent Now</a>
//                     </button>
//                   </CardFooter>
//                 </Card>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">No cars available</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Morecares;

// type Car = {
//   id: number;
//   name: string;
//   type: string;
//   fuel_capacity: string;
//   transmission: string;
//   seating_capacity: string;
//   price_per_day: string;
//   image_url: string;
//   tags: string[];
// };
