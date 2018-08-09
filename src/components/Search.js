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
    let query = search ? queryString.parse(search).query : '';

    this.setState({query})

    this.props.searchBooks(query);
  }

  handleSearch(e) {
    const query = e.target.value.trim();
    this.props.history.replace({search: queryString.stringify({query})});
    this.setState({ query });

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
        <SearchBar search={this.state.query} handleSearch={(e) => this.handleSearch(e)} />
        <ListBooks books={books} onChangeShelf={(book, shelf) => this.onChangeShelf(book, shelf)} />
      </div>
    );
  }
}

export default Search;
