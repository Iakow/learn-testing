export type Book = {
  name: string;
  id: number;
  description?: string;
  reviews?: Review[];
};

export type BookListStateType = {
  books: Book[];
  loading: boolean;
  error: boolean;
  term: string;
};

export type Review = {
  id: number;
  bookId: number;
  name: string;
  date: string;
  content: string;
};
