import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Page from '~/routes/Page';
import Home from '~/routes/Home';

import '~/style/style.scss';
import Store from '~/context/Store';

const App = () => (
   <Store>
      <BrowserRouter>
         <Switch>
            <Route path="/page">
               <Page />
            </Route>
            <Route path="/">
               <Home />
            </Route>
         </Switch>
      </BrowserRouter>
   </Store>
);

export default hot(module)(App);
