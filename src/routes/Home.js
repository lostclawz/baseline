import React, {PureComponent} from 'react';
import {connect} from 'react-redux';


export default
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
