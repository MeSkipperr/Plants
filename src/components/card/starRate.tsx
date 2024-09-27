import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaStarHalfAlt } from 'react-icons/fa';

interface StarRatingProps {
    rating?: number;           // Default: 0
    totalStars?: number;       // Default: 5
    className?: string;        // Custom className for icons
}

const StarRating: React.FC<StarRatingProps> = ({
    rating = 0,
    totalStars = 5,
    className = "text-third"
}) => {
    const fullStars = Math.floor(rating);  // Number of full stars
    const hasHalfStar = rating % 1 !== 0;  // Check if there is a half star
    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<AiFillStar key={i} className={className} />);
    }

    // Add half star if needed
    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" className={className} />);
    }

    // Add remaining empty stars
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < totalStars; i++) {
        stars.push(<AiOutlineStar key={i} className={className} />);
    }

    return <div className="flex">{stars}</div>;
};

export default StarRating;
