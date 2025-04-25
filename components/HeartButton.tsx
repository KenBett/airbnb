// @\components\HeartButton.tsx
"use client";
import useFavorite from "@/hooks/useFavorite";
import { SafeUser } from "@/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiFillHeart
        size={24}
        className={`-top-[2px] -right-[2px] ${hasFavorited ? "fill-rose-500" : "fill-white"}`}
       />
    </div>
  );
};
export default HeartButton;
