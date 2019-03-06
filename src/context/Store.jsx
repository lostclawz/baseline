import React, { useReducer, createContext, useEffect } from 'react';
import rootReducer from '~/reducers/_root-reducer';
import { setupWorkerListener } from '~/workers/worker-connector';
import DEFAULT_STORE from '~/defaultStore';
import {
   // tapMiddleware,
   actionLoggerMiddleware,
   thunkerMiddleware,
   reduceMiddlewares,
} from '~/utils/redux-utils';

// const tap = tapMiddleware(!window.PRODUCTION);
const actionLogger = actionLoggerMiddleware(!window.PRODUCTION);

export const StoreContext = createContext(null);

const Store = ({ children }) => {
   const [state, dispatch] = useReducer(rootReducer, DEFAULT_STORE);

   // initialize connection to search worker with dispatch
   // useEffect(() => {
   //    setupWorkerListener(dispatch);
   // }, []);

   const middlewares = [
      // tap('pre-thunk'),
      thunkerMiddleware,
      // tap('post-thunk'),
      // tap('between thunked and logged'),
      actionLogger,
      // tap('pre-dispatch'),
   ];

   const dispatcher = reduceMiddlewares(middlewares, state, dispatch);

   return (
      <StoreContext.Provider
         value={{ state, dispatch: dispatcher }}
      >
         {children}
      </StoreContext.Provider>
   );
};
export default Store;
