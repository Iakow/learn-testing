import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchBooks, setTerm } from "./bookListSlice";

export const SearchBox = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { term } = useSelector((state: RootState) => ({
    term: state.list.term,
  }));
  const performSearch = (event: any) => {
    const value = event.target.value;
    if (value && value.trim().length === 0) {
      return;
    }
    dispatch(setTerm(value));
    dispatch(fetchBooks(value));
  };

  return (
    <TextField
      label="Search"
      value={term}
      data-test="search"
      onChange={performSearch}
      margin="normal"
      variant="outlined"
    />
  );
};
