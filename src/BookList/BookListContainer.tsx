import { BookList } from "./BookList";
import { useBooks } from "../hooks";
import { SearchBox } from "./SearchBox";

export const BookListContainer = () => {
  const { books, term, setTerm } = useBooks();

  return (
    <>
      <SearchBox term={term} onSearch={setTerm} />
      <BookList books={books} />
    </>
  );
};
