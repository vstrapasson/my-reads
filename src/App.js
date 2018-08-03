import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './components/Home';
import Search from './components/Search';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
