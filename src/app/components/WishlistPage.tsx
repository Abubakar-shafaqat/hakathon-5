// components/WishlistPage.tsx
"use client";
import { useState, useEffect } from "react";
import { FaHeart } from 'react-icons/fa';

type WishlistItem = {
  img: string | undefined;
  title: string;
  id: number;
  price: number | string;
};

const cleanPrice = (price: string | number) =>
  parseFloat(String(price).replace(/[^0-9.-]+/g, ""));

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } else {
      localStorage.removeItem("wishlist");
    }
  }, [wishlist]);


  // Remove item from wishlist
  const handleRemoveFromWishlist = (id: number) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    alert("Removed from wishlist!");
  };

  return (
    <div className="p-6 mt-11">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow-md">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-4">
                <p className="font-semibold truncate">{item.title}</p>
                <p className="text-gray-600">${cleanPrice(item.price)}</p>
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="mt-2 text-red-600 text-sm underline flex items-center"
                >
                  <FaHeart className="mr-1" />
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;