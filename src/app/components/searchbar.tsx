"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi"; // Import search icon from react-icons

// Define the type for a car
interface Car {
  id: string;
  name: string;
  type: string;
  seating_capacity: string;
  image_url: string;
}

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cars from the API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          "https://678cc7fcf067bf9e24e83478.mockapi.io/carrental"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API Response:", data); // Debugging: Log API response
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch cars"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200); // Delay to allow click on list items
  };

  // Filter cars based on search input
  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      car.type.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Input */}
      <div className="relative w-full">
        <input
          type="search"
          placeholder="Search cars..."
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={searchInput}
          className="w-full px-6 py-3 pl-12 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all ease-in-out duration-300"
        />
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Dropdown List */}
      {isFocused && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto transition-all ease-in-out duration-300">
          {loading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="px-4 py-2 text-red-500">{error}</div>
          ) : filteredCars.length === 0 ? (
            <div className="px-4 py-2 text-gray-500">No cars found.</div>
          ) : (
            <ul>
              {filteredCars.map((car) => (
                <li
                  key={car.id}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-all ease-in-out duration-300"
                >
                  <Link
                    href={`morecars/car?id=${car.id}`} // Link to dynamic car details page
                    className="block w-full h-full"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={car.image_url || "/placeholder.png"} // Fallback image if image_url is missing
                        alt={car.name}
                        className="w-14 h-14 object-cover rounded-lg shadow-sm"
                      />
                      <div className="ml-3 flex flex-col">
                        <p className="font-semibold text-gray-800">{car.name}</p>
                        <p className="text-sm text-gray-500">
                          {car.type} - {car.seating_capacity}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
