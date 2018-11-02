import React, {PureComponent} from 'react';
import {connect} from 'react-redux';


@connect(
   state => ({
   }),
   dispatch => ({
   })
)
class Home extends PureComponent{
   render(){
      return (         
         <div>Hello World</div>
      );
   }
}
export default Home