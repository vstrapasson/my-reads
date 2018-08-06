import React, { Component } from 'react';
import queryString from 'query-string';

import SearchBar from './SearchBar';
import ListBooks from './ListBooks';

class Search extends Component {

  state = {
    query: '',
  }

  componentDidMount() {
    const { search } = this.props.location;
    let query = '';

    if (search) {
      query = queryString.parse(search).query;
    }

    this.setState({query})

    this.props.searchBooks(query);
  }

  handleSearch(e) {
    const query = e.target.value.trim();
    this.props.history.push({search: queryString.stringify({query})});
    this.setState({ query });

    if (query === '') {
      this.setState({books: []});
      return;
    }

    this.props.searchBooks(query);
  }

  onChangeShelf(book, shelf) {
      this.props.updateShelf(book, shelf);
  }

  render() {
    let { books } = this.props;

    books = Object.values(books);

    return (
      <div className="search">
        <SearchBar search={this.state.query} handleSearch={this.handleSearch.bind(this)} />
        <ListBooks books={books} onChangeShelf={this.onChangeShelf.bind(this)} />
      </div>
    );
  }
}

export default Search;
