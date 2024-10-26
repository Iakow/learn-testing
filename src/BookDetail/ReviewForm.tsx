import {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import {fetchBookDetails} from "./bookDetailsSlice";
import {Button, TextField} from "@mui/material";
import {Book} from "../types";
import {addReview} from "./reviewSlice";

export const ReviewForm = ({book}: { book: Book }) => {
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    dispatch(addReview({id: book.id, name, content}));
    dispatch(fetchBookDetails(String(book.id)));
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        data-testid="name"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        data-testid="content"
        name="content"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button name="submit" data-testid="submit" onClick={() => handleSubmit()}>
        Submit
      </Button>
    </form>
  );
};
