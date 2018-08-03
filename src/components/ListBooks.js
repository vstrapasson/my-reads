import React from 'react';

import Book from './Book';

const ListBooks = (props) => {
  return (
    <div className="shelf">
      <h2>{props.shelfName}</h2>
      <ul className="book-list">
        {props.books && props.books.map(book => {
          return <Book key={book.id} book={book} onChangeShelf={props.onChangeShelf}/>
        })}
      </ul>
    </div>
  );
};

export default ListBooks;
