import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        Home Page
      </Route>
      <Route exact path="/starred">
        Starred Items Page
      </Route>
      <Route>404 Error Page</Route>
    </Switch>
  );
}

export default App;
