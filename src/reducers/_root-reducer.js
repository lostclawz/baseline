import uiReducer from '~/reducers/uiReducer';
import {combineReducers} from '~/utils/redux-utils';


export const rootReducer = combineReducers({
   ui: uiReducer,
});

export default rootReducer;
