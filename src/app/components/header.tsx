import React from "react";
import { IoIosNotifications } from "react-icons/io";
import Acount from "./acount";
import Link from "next/link";
import SearchBar from "./searchbar";
import { FaRegHeart } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="w-full h-auto flex flex-col md:flex-row items-center justify-between p-4 md:p-6 lg:p-8 border-b border-[#e7eef6] bg-white shadow-sm">
      {/* Logo and Search Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 lg:gap-16 w-full md:w-auto">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-[#3360e9] text-3xl sm:text-4xl font-bold cursor-pointer hover:text-blue-600 transition">
            MORENT
          </h1>
        </Link>
        {/* Search Bar */}
        <div className="relative w-full md:w-auto">
          <SearchBar />
        </div>
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-6 md:gap-8 mt-4 md:mt-0">
        {/* Wishlist Icon */}
        <Link href="/wishlist">
          <FaRegHeart
            className="text-gray-500 hover:text-blue-500 cursor-pointer transition duration-300"
            size={28}
          />
        </Link>
        {/* Notifications Icon */}
        <IoIosNotifications
          className="text-gray-500 hover:text-blue-500 cursor-pointer transition duration-300"
          size={28}
        />
        {/* Account Button */}
        <div className="flex items-center">
          <div className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
            <Acount />
          </div>
        </div>
      </div>
    </header>
  );
}
