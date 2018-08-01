import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';

import ListBooks from './components/ListBooks';
import Header from './components/Header';

import * as API from './utils/BooksAPI';

class App extends Component {

  state = {
    books: [],
    loading: true
  }

  componentDidMount() {
      API.getAll().then(books => {
          books = _.groupBy(books, 'shelf');
          this.setState({books, loading: false});
      });
  }

  render() {

    if (this.state.loading) {
        return <p>Loading...</p>
    }

    const { books } = this.state;

    return (
      <div className="App">
        <Header />
        <ListBooks shelfName="Currently Reading" books={books.currentlyReading} />
        <ListBooks shelfName="Read" books={books.read} />
        <ListBooks shelfName="Want to Read" books={books.wantToRead} />
      </div>
    );
  }
}

export default App;
