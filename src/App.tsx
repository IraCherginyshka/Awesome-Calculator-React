import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
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
      <Footer />
    </Container>
  );
};

export default App;
