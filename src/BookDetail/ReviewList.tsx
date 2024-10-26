import { Review } from "../types";
import { ReviewItem } from "./ReviewItem";

export const ReviewList = ({
  reviews,
  bookId,
}: {
  reviews: Review[];
  bookId?: number;
}) => {
  return (
    <div data-testid="reviews-container">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} bookId={bookId} />
      ))}
    </div>
  );
};
