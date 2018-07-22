import DEFAULT_STORE from '~/defaultStore';


export default function uiReducer(
   state = DEFAULT_STORE.ui,
   action
) {
   switch (action.type) {     
      default:
         return state;
   }
}