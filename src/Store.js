import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import configureHotStore from '~/utils/configureHotStore';
import { LOGGING_ON } from '~/constants';
import { rootReducer } from './reducers/_root-reducer';


const middlewares = [];
middlewares.push(thunk);
if (LOGGING_ON) {
   middlewares.push(createLogger({
      collapsed: true,
      duration: true,
   }));
}

export const store = configureHotStore(
   rootReducer,
   './reducers/_rootReducer.js',
   applyMiddleware(...middlewares),
);
