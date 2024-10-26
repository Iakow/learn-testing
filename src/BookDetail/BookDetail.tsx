import { Book } from "../types";
import { ReviewList } from "./ReviewList";
import { ReviewForm } from "./ReviewForm";

const BookDetail = ({ book }: { book: Book }) => {
  return (
    <div className="detail">
      <h2 className="book-title">{book.name}</h2>
      <p className="book-description" data-testid="book-description">
        {book.description ? book.description : book.name}
      </p>
      <ReviewForm book={book} />
      {book.reviews && <ReviewList reviews={book.reviews} bookId={book.id} />}
    </div>
  );
};

export default BookDetail;
