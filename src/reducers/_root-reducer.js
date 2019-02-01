import { combineReducers } from 'redux';
import uiReducer from '~/reducers/uiReducer';


export const rootReducer = combineReducers({
   ui: uiReducer,
});

export default rootReducer;
