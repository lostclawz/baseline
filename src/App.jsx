import '~/style/style.scss';
import React, { lazy } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Store from '~/context/Store';
// dynamically loaded components
const Page = lazy(() => import('~/routes/Page'));
const Home = lazy(() => import('~/routes/Home'));

const App = () => (
   <Store>
      <BrowserRouter>
         <Switch>
            <Route path="/page" component={Page} />
            <Route path="/" component={Home} />
         </Switch>
      </BrowserRouter>
   </Store>
);

export default hot(module)(App);
