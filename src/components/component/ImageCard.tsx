import React from "react";

interface ImageCardProps {
  imageUrl: string;
  title: string;
  author: string;
  ratingCount: number;
}

export const mattColors = [
  "#DAF7A6",
  "#FFC300",
  "#FF5733",
  "#C70039",
  "#900C3F",
  "#581845",
  "#FFC618",
  "#9C133A",
  "#FDBA00",
  "#009A40",
  "#FF9A01"
];

export function pickRandomItem<T>(array: T[]): T | undefined {
    if (array.length === 0) {
      return undefined; // Return undefined for an empty array
    }
  
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, title }) => {
    const bgcolor = pickRandomItem(mattColors);
  return (
    <div style={{background:bgcolor}} className={`m-4 hover:scale-105 flex-shrink-0 h-72 relative overflow-hidden rounded-2xl max-w-xs shadow-lg`}>
      <svg
        className="absolute bottom-0 left-0 mb-8"
        viewBox="0 0 375 283"
        fill="none"
        style={{ transform: "scale(1.5)", opacity: "0.1" }}
      >
        <rect
          x="159.52"
          y="175"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 159.52 175)"
          fill="white"
        />
        <rect
          y="107.48"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 0 107.48)"
          fill="white"
        />
      </svg>
      <div className="relative  flex items-center justify-center">
        <div
          className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
          style={{
            background: "radial-gradient(black, transparent 60%)",
            transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
            opacity: "0.2",
          }}
        ></div>
        <img className="relative object-cover" src={imageUrl} alt={title} />
      </div>
      {/* <div className="relative backdrop-blur text-white px-6 pb-6 mt-6">
        <span className="block opacity-75 -mb-1">{author}</span>
        <div className="flex justify-between">
          <span className="block font-semibold text-xl">{title}</span>
          <span className="block bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
            {ratingCount}
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default ImageCard;
