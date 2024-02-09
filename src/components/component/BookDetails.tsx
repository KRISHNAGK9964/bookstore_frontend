import {GoogleBook} from "@/types/common";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FireIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";

const BookDetails: React.FC<{ book: GoogleBook }> = ({ book }) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="relative flex">
        <div className="min-h-screen lg:w-1/3"></div>
        <div className="hidden w-3/4 min-h-screen bg-gray-100 dark:bg-gray-800 lg:block"></div>

        <div className="container flex flex-col justify-center w-full min-h-screen px-6 py-10 mx-auto lg:absolute lg:inset-x-0">
          {/* <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            What our <span className="text-blue-500">Readers</span> <br /> are
            saying
          </h1> */}
          <div className="flex items-center justify-between lg:justify-start">
            <Link to={"/"}>
              <button
                title="left arrow"
                className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </Link>
          </div>
          <div className=" mt-10 lg:mt-20 lg:flex lg:items-center">
            <img
              className="object-contain object-center w-full lg:w-[32rem] rounded-lg h-96"
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt=""
            />

            <div className="mt-6 lg:w-2/3 lg:pl-10 lg:py-6 lg:mt-0">
              <h2 className="relative tracking-widest font-medium">
                {book.volumeInfo.authors?.[0]}
                <div className="w-fit absolute right-0 ">
                  <FireIcon className="h-10 w-10 text-rose-500" />
                </div>
              </h2>
              <h1 className="mb-1 text-3xl font-semibold text-gray-900">
                {book.volumeInfo.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <span className="text-xs mr-3 font-semibold px-2.5 py-0.5 rounded bg-cyan-900 bg-opacity-80 text-gray-100">
                    {book.volumeInfo.averageRating || 4.2}
                  </span>
                  |
                  <span className="ml-3 text-gray-700">
                    {book.volumeInfo.pageCount} Pages
                  </span>
                </span>
              </div>
              <p className="leading-relaxed">{book.volumeInfo.description}</p>

              <div className="flex items-baseline my-4">
                <span className="text-2xl before:mr-1 before:content-['₹'] font-medium text-gray-900 title-font">
                  {`${ 449 - 50}`}
                </span>
                <span className="text-md ml-2 before:mr-1 line-through before:content-['₹'] font-medium text-gray-600 title-font">
                  {`${499}`}
                </span>
                <div className="flex ml-auto">
                  <Link to={`${book.selfLink}`}>
                    <Button variant={"outline"}>
                      <RocketLaunchIcon className="w-4 h-4" />
                      Check
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
