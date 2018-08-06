import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';

import ListBooks from './ListBooks';
import Header from './Header';

class Home extends Component {

  state = {
    books: [],
    loading: true
  }

  onChangeShelf(book, shelf) {
      this.props.updateShelf(book, shelf);
  }

  render() {
    let { books } = this.props;

    books = _.groupBy(books, 'shelf');

    return (
      <div>
        <Header />
        <ListBooks shelfName="Currently Reading" books={books.currentlyReading} onChangeShelf={this.onChangeShelf.bind(this)}/>
        <ListBooks shelfName="Read" books={books.read} onChangeShelf={this.onChangeShelf.bind(this)} />
        <ListBooks shelfName="Want to Read" books={books.wantToRead} onChangeShelf={this.onChangeShelf.bind(this)} />
        <div className="open-search">
          <Link to="/search" ></Link>
        </div>
      </div>
    );
  }

}

export default Home;
