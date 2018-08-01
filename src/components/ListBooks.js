import React, { Component } from 'react';

import Book from './Book';

const ListBooks = (props) => {
  return (
    <div>
      <h2>{props.shelfName}</h2>
      <hr />
      <ul className="book-list">
        {props.books.map(book => {
          return <Book key={book.title} book={book} />
        })}
      </ul>
    </div>
  );
};

export default ListBooks;
