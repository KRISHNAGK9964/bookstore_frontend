import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { config } from "../../../Constants.ts";
import { book } from "@/pages/Book/Home/index.tsx";

interface SearchBarProps {
  setBooks: React.Dispatch<React.SetStateAction<book[]>>;
}
const SearchBar: React.FC<SearchBarProps> = ({ setBooks }) => {
  const [input, setInput] = useState("");
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    let q = input;
    if(!input){
        q = "A"
    }
    console.log(input);
    const res = await fetch(`${config.url}/api/books?query=${q}&limit=16`);
    const data = await res.json();
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
    setInput("");
  };
  return (
    <div>
      <form onSubmit={handleSearch} className="flex items-center">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full mr-4">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            id="simple-search"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="bg-white border-none outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-3  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search branch name..."
          />
        </div>
        <button
          type="submit"
          className="p-3 ms-2 text-sm font-medium text-white bg-orange-400 rounded-lg border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-400 dark:hover:bg-orange-500 dark:focus:ring-orange-600"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
      <div className="flex w-full max-w-sm items-center space-x-2"></div>
    </div>
  );
};

export default SearchBar;
