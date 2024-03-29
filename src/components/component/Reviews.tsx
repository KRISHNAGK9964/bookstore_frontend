import { GoogleBook, Review } from "@/types/common";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";
import axios from "axios";
import { config } from "../../../Constants";
import { useSelector } from "react-redux";
import { RootState } from "@/toolkit/store/store";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";
import Cookies from "js-cookie";
interface ReviewsProps {
  book: GoogleBook;
}

const Reviews: React.FC<ReviewsProps> = ({ book }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState({ rating: 4.3, text: "" });
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const accessToken = Cookies.get("access_token");
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${config.url}/api/reviews/${book.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }); // Replace with your backend URL
      console.log(response.data);
      setReviews(response.data.reviews);
    } catch (error: any) {
      console.error("Error fetching reviews:", error.message);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, [book.id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !accessToken) {
      console.log("postreview", user, accessToken);
      return navigate("/login");
    }
    try {
      await axios.post(
        `${config.url}/api/reviews/${book.id}`, // Replace with your backend URL
        { ...userReview, userId: user._id, username: user.username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // After submitting a review, fetch updated reviews
      fetchReviews();

      // Clear userReview state
      setUserReview({ rating: 0, text: "" });
    } catch (error: any) {
      console.error("Error submitting review:", error.message);
    }
  };

  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <section className="relative bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion
          </h2>
        </div>
        <form onSubmit={handleReviewSubmit} className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={6}
              value={userReview.text}
              onChange={(e) =>
                setUserReview({ ...userReview, text: e.target.value })
              }
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a review..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-orange-400 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post review
          </button>
        </form>
        {reviews.map((review) => (
          <>
            <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={`avatar2.jpg`}
                      alt="Michael Gough"
                    />
                    {review.username}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time>{`${new Date(review.updatedAt)}`}</time>
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      id="dropdownComment2Button"
                      data-dropdown-toggle="dropdownComment2"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      type="button"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                      >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                      <span className="sr-only">Comment settings</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Edit
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Remove
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{review.text}</p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  onClick={() => setCommentsOpen((old) => !old)}
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                >
                  <svg
                    className="mr-1.5 w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                  </svg>
                  Reply
                </button>
              </div>
            </article>
            {commentsOpen && <Comments review={review} />}
          </>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
