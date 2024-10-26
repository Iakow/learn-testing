import { useBook } from "../hooks";
import BookDetail from "./BookDetail";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchBookDetails } from "./bookDetailsSlice";

const BookDetailContainer = () => {
  const { id = "" } = useParams<string>();
  const { book } = useSelector((state: RootState) => ({
    book: state.detail.book,
  }));

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [dispatch]);

  const { loading, error } = useBook();

  return <BookDetail book={book} />;
};

export default BookDetailContainer;
