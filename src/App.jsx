import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { store } from '~/Store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Page from '~/routes/Page';
import Home from '~/routes/Home';

import '~/style/style.scss';


const App = () => (
   <Provider store={store}>
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
   </Provider>
);

export default hot(module)(App);
