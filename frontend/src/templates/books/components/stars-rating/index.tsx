import { IconType } from "react-icons";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

type Props = {
  bookId: string;
  avgRating: number;
};

export function StarsRating({ bookId, avgRating }: Props) {
  const renderStars = (avgRating: number) => {
    const stars: IconType[] = [];

    const integerPart = Math.floor(avgRating);
    const decimalPart = avgRating - integerPart;

    stars.push(...Array(integerPart).fill(BsStarFill));

    if (decimalPart >= 0.5) {
      stars.push(BsStarHalf);
    }

    if (integerPart < 5 && decimalPart < 0.5) {
      stars.push(BsStar);
    }

    if (stars.length < 5) {
      stars.push(...Array(5 - stars.length).fill(BsStar));
    }

    return stars;
  };

  return (
    <div className="flex mt-auto mx-auto items-center">
      <p className="text-center underline font-bold text-yellow-600 mt-[0.2rem] mr-2">
        {avgRating}
      </p>

      {renderStars(avgRating).map((StarIcon, index) => (
        <StarIcon className="text-yellow-600" key={`${bookId}-${index}`} />
      ))}
    </div>
  );
}
