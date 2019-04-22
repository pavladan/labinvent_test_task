import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import {Settings} from './modules'
import {NotFound,StartPage} from './components'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={StartPage} />
            <Route path="/settings" exact component={Settings} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
