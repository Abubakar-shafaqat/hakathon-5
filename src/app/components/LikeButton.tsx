"use client"; // Add this at the top since this is a client component

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useWishlist } from "../context/WishlistContext";

interface LikeButtonProps {
  car?: {
    id: number;
  };
}

function LikeButton({ car }: LikeButtonProps) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Check if car is valid
  if (!car || typeof car.id === "undefined") {
    return null; // Render nothing if car is undefined or doesn't have an ID
  }

  const isWishlisted = wishlist.includes(car.id);

  return (
    <button
      onClick={() =>
        isWishlisted
          ? removeFromWishlist(car.id)
          : addToWishlist(car.id)
      }
      className="absolute top-2 right-2 z-10 bg-white p-1 rounded-full"
    >
      {isWishlisted ? (
        <FaHeart size={20} className="text-red-500" />
      ) : (
        <FaRegHeart size={20} className="text-gray-500" />
      )}
    </button>
  );
}

export default LikeButton;
