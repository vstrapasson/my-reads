import React, { Component } from 'react';
import queryString from 'query-string';

import SearchBar from './SearchBar';
import ListBooks from './ListBooks';

import * as API from '../utils/BooksAPI';

class Search extends Component {

  state = {
    query: '',
    books: []
  }

  componentDidMount() {
      const { search } = this.props.location;

      if (!search) {
        return;
      }

      const { query } = queryString.parse(search);
      this.setState({query})
      this.searchBooks(query);
  }

  searchBooks(query) {
    API.search(query).then(books => {
      if (!books) {
        books = [];
      }
      if (books.error && books.error === "empty query") {
        books = [];
      }
      this.setState({books, loading: false});
    });
  }

  onSearch(e) {
    const query = e.target.value.trim();
    this.props.history.push({search: queryString.stringify({query})});
    this.setState({ query });

    if (query === '') {
      this.setState({books: []});
      return;
    }

    this.searchBooks(query);
  }

  onChangeShelf(book, shelf) {
    this.setState(state => {
      const books = state.books.filter(b => b.id !== book.id)
      return {books};
    });

    API.update(book, shelf).then(res => console.log(res))
  }



  render() {
    return (
      <div className="search">
        <SearchBar search={this.state.query} onSearch={this.onSearch.bind(this)} />
        <ListBooks books={this.state.books} onChangeShelf={this.onChangeShelf.bind(this)} />
      </div>
    );
  }
}

export default Search;
