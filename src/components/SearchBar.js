import React from 'react';
import { Link } from 'react-router-dom';

const SearchBar = props => (
  <header className="search-bar">
      <Link to="/" className="close-search"></Link>
      <input onChange={props.handleSearch} value={props.search} type="search" placeholder="Search by title or author"></input>
  </header>
);

export default SearchBar;
