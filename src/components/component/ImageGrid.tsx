import React from "react";
import ImageCard from "./ImageCard";
import { book } from "@/pages/Book/Home";
import { Link } from "react-router-dom";

interface ImageGridProps {
  items: book[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((image, index) => (
        <Link key={index} to={`/${image.id}`}>
        <ImageCard  imageUrl={`https://books.google.com/books/publisher/content/images/frontcover/${image.id}?fife=w400-h600&source=gbs_api`} title={image.title} author={image.authors[0]} ratingCount={image.ratingCount} />
        </Link>
      ))}
    </div>
  );
};

export default ImageGrid;
