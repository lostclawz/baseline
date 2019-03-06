export const combineReducers = (reducers) => {
   const keys = Object.keys(reducers);
   const numReducers = keys.length;
   return (state = {}, action = {}) => {
      // using redux would affect performance
      const next = {};
      let k;
      for (let i = 0; i < numReducers; i++) {
         k = keys[i];
         next[k] = reducers[k](state[k], action);
      }
      return next;
   };
};

export const reduceMiddlewares = (middlewares, state, dispatch) => action => (
   middlewares
      .concat([
         args => dispatch(args[0]),
      ])
      .reduce(
         (acc, curr) => curr(acc),
         [action, state, dispatch],
      )
);

export const tapMiddleware = (loggingOn = true) => label => (args) => {
   if (loggingOn) {
      const logStyle = 'color: orange; background-color: black; padding: 5px;';
      console.log(`%c${label}`, logStyle);
   }
   return args;
};

// eslint-disable-next-line consistent-return
export const thunkerMiddleware = (args) => {
   const [action, state, dispatch] = args;
   if (typeof action === 'function') {
      action(dispatch, state);
   }
   else {
      return args;
   }
};

export const actionLoggerMiddleware = (logActions = true) => (args) => {
   const [action, state] = args;
   const logStyle = 'color: yellow; background-color: black; padding: 2px 3px;';
   if (logActions) {
      console.log('%cACTION', logStyle, action);
      console.log('%cSTATE ', logStyle, state);
      console.log('---------');
   }
   return args;
};

// very rough reducer implementation
export function buildReducer(reducerFunc, initialState) {
   const history = [initialState];
   let currentState = history[history.length - 1];
   return [
      currentState,
      (action) => {
         const next = reducerFunc(currentState, action);
         if (Object.is(next, currentState)) {
            // no need for updates
            return false;
         }
         history.push(next);
         currentState = history[history.length - 1];
         return true;
      },
   ];
}
