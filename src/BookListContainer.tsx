import React from 'react';
import {BookList} from './BookList';
import {useBooks} from "./useBooks";

export const BookListContainer = () => {
  const {loading, error, books} = useBooks();

  // if(loading) {
  //   return <p>Loading...</p>
  // }
  
  // if(error) {
  //   return <p>Error...</p>
  // }

  return <BookList books={books}/>
}
