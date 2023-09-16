export type Book = {
  name: string;
  id: number;
  description?: string;
};

export type BookListStateType = {
  books: Book[];
  loading: boolean;
  error: boolean;
  term: string;
};
