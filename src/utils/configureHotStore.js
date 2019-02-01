import { createStore } from 'redux';

export default function configureHotStore(
   rootReducer,
   reducerLocation,
   initialState,
) {
   const store = createStore(rootReducer, initialState);

   if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept(reducerLocation, () => {
         const nextRootReducer = rootReducer;
         store.replaceReducer(nextRootReducer);
      });
   }
   return store;
}
