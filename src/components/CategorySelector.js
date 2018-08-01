import React, { Component } from 'react';

class CategorySelector extends Component {

  render() {
    return (
      <div className="category-selector">
        <select>
          <option disabled>Move to...</option>
          <option>Currently Reading</option>
          <option>Want to Read</option>
          <option>Read</option>
          <option>None</option>
        </select>
      </div>
    );
  }

}

export default CategorySelector;
