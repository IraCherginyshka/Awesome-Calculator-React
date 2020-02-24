import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { LevelPage } from './components/LevelPage/LevelPage';

const App: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Header title="Awesome Math" />
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/level/:id" component={LevelPage} />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
