import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating); // Get full star count
  const hasHalfStar = rating % 1 !== 0; // Check if there's a decimal
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining stars

  return (
    <div className="flex w-4/5 space-x-1 text-yellow-400 text-xl ">
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} />
      ))}

      {/* Render half star if needed */}
      {hasHalfStar && <FaStarHalfAlt />}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i} />
      ))}
    </div>
  );
};

export default StarRating;