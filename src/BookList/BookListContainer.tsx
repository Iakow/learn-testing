import { BookList } from "./BookList";
import { useBooks } from "../hooks";
import { SearchBox } from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "./bookListSlice";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";

export const BookListContainer = () => {
  const { books } = useSelector((state: RootState) => ({
    books: state.list.books,
  }));

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchBooks(""));
  }, [dispatch]);

  return (
    <>
      <SearchBox />
      <BookList books={books} />
    </>
  );
};
