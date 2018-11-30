import React, {PureComponent} from 'react';
import {StateContext} from '~/context/StateContext';


export const Home = React.memo(() => {
   let {state} = React.useContext(StateContext);
   
   return (
      <div>Hello World</div>
   )
})

export default Home;