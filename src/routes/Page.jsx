import React from 'react';
// import { StoreContext } from '~/context/Store';

export default function Page(props) {
   // const { state, dispatch } = React.useContext(StoreContext);
   return (
      <div>{props.children || 'Page'}</div>
   );
}
