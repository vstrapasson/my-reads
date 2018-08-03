import React from 'react';

const ShelfSelector = (props) => {
    return (
      <div className="book-shelf-changer">
        <select
          onChange={(e) => {
            const { book, onChangeShelf } = props;
            onChangeShelf(book, e.target.value);
          }}
          value={props.book.shelf ? props.book.shelf : "none"}
        >
          <option disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
}

export default ShelfSelector;
