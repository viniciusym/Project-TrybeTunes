import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/album/:id" render={ () => <Album /> } />
          <Route path="/favorites" render={ () => <Favorites /> } />
          <Route path="/search" render={ () => <Search /> } />
          <Route path="/" render={ () => <Login /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
