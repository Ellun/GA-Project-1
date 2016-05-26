'user strict'
import $ from 'jquery';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Navigation, Link, browserHistory, IndexRoute} from 'react-router';
import Player from './components/players';

export default class App extends Component {
  render() {
    return (
      <div>
        <Player player={'p1'} />
        <Player player={'p2'} />
      </div>
    )
  }
}

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
    </Route>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#container'))

module.exports = App;
