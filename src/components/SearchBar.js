import React from 'react';
import { Link } from 'react-router-dom';

const SearchBar = props => (
  <header className="search-bar">
      <Link to="/" className="close-search"></Link>
      <input onChange={props.onSearch} value={props.search} type="search"></input>
  </header>
);

export default SearchBar;
