import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../../../Constants';
import {GoogleBook }from '@/types/common';
import BookDetails from '@/components/component/BookDetails';
import Reviews from '@/components/component/Reviews';
import Cookies from 'js-cookie';


const Book: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<GoogleBook | null>(null);
  const access_token = Cookies.get("access_token");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${config.url}/api/books/${bookId}`,{
          headers:{
            "Authorization" : `Bearer ${access_token}`
          },withCredentials:true
        }); // Replace with your backend URL
        console.log(response);
        setBook(response.data.book);
      } catch (error:any) {
        console.error('Error fetching book details:', error.message);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  return (
    <div className="container relative">
      {book ? (
        <>
        <BookDetails book={book}/> 
        <Reviews book={book}/>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Book;
