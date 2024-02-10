import { config } from "../../../../Constants";
import React, { useEffect, useState } from "react";
import Header from "@/components/component/Navbar";
import ImageGrid from "@/components/component/ImageGrid";
import SearchBar from "@/components/component/SearchBar";
import Cookies from "js-cookie";

export type book = {
  id: string;
  title: string;
  selfLink: string;
  imageUrl: string;
  avgRating: number;
  ratingCount: number;
  authors: string[];
};

const Home: React.FC = () => {
  const [books, setBooks] = useState<book[]>([]);
  const accessToken = Cookies.get("access_token");
  const fetchBooks = async () => {
    const res = await fetch(`${config.url}/api/books?limit=16`,{
      headers : {Authorization: `Bearer ${accessToken}`}
    });
    const data = await res.json();
    console.log(data);
    const items = data.books.items.map((item: any) => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        selfLink: item.selfLink,
        imageUrl:
          item.volumeInfo?.imageLinks?.medium ||
          item.volumeInfo?.imageLinks?.thumbnail ||
          "",
        authors: item.volumeInfo.authors,
        avgRating: item.volumeInfo.averageRating,
        ratingCount: item.volumeInfo.ratingCount,
      };
    });
    console.log(items);
    setBooks(items);
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen w-full bg-orange-50">
      <div className="mt-2">
        <Header />
      </div>
      <div className="max-w-screen-lg mx-auto m-4 mb-8">
        <SearchBar setBooks={setBooks} />
      </div>
      <div className="max-w-screen-xl mx-auto">
        <ImageGrid items={books} />
      </div>
    </div>
  );
};

export default Home;
