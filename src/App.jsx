import '~/style/style.scss';
import React, { lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Store from '~/context/Store';
import Loading from '~/components/Loading';
// dynamically loaded components
const Page = lazy(() => import('~/routes/Page'));
const Home = lazy(() => import('~/routes/Home'));

const App = () => (
   <Store>
      <BrowserRouter>
         <React.Suspense fallback={<Loading />}>
            <Switch>
               <Route path="/page" component={Page} />
               <Route path="/" component={Home} />
            </Switch>
         </React.Suspense>
      </BrowserRouter>
   </Store>
);

export default App;
