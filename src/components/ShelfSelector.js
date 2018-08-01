import React from 'react';

const ShelfSelector = (props) => {
    return (
      <div className="category-selector">
        <select onChange={(e) => {
          const { book, changeShelf } = props;

          changeShelf(book, e.target.value);
        }}>
          <option disabled>Move to...</option>
          <option>Currently Reading</option>
          <option>Want to Read</option>
          <option>Read</option>
          <option>None</option>
        </select>
      </div>
    );
}

export default ShelfSelector;
