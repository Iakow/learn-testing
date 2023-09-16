import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Book } from "./types";
import axios from "axios";

export const useBook = () => {
  const { id } = useParams<string>();
  const [book, setBook] = useState<Book>({ id: 0, name: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await axios.get(`http://localhost:8080/books/${id}`);
        setBook(book.data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  return {
    book,
    loading,
    error,
  };
};

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [term, setTerm] = useState<string>("");

  const fetchBooks = async (term: string) => {
    setError(false);
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:8080/books?q=${term}&_sort=id`
      );
      setBooks(response.data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(term);
  }, []);

  useEffect(() => {
    fetchBooks(term);
  }, [term]);

  return {
    loading,
    error,
    books,
    term,
    setTerm,
  };
};
