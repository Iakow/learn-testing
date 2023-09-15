import { useBook } from "../hooks";
import BookDetail from "./BookDetail";

const BookDetailContainer = () => {
  const { book, loading, error } = useBook();

  return <BookDetail book={book} />;
};

export default BookDetailContainer;
