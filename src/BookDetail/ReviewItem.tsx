import {Review} from "../types";
import {useState} from "react";
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import {updateReview} from "./reviewSlice";
import {fetchBookDetails} from "./bookDetailsSlice";

export const ReviewItem = ({review, bookId}: {
  review: Review;
  bookId?: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState<string>(review.content);

  const updateReviewContent = async () => {
    if (editing) {
      await dispatch(
        updateReview({
          reviewId: review.id,
          bookId: review.bookId,
          content,
        })
      );

      dispatch(fetchBookDetails(String(bookId)));
    }
    setEditing((editing) => !editing);
  };

  return (
    <div data-testid="review" className="review" key={review.id}>
      <div data-testid="name">{review.name}</div>
      {!editing ? (
        <p data-testid="review-content">{review.content}</p>
      ) : (
        <TextField
          name="content"
          label="Content"
          margin="normal"
          variant="outlined"
          multiline
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}
      <Button
        color="info"
        onClick={updateReviewContent}
      >
        {!editing ? "Edit" : "Submit"}
      </Button>
    </div>
  );
};
