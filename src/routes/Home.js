import React, {PureComponent} from 'react';
import {connect} from 'react-redux';


@connect(
   state => ({
   }),
   dispatch => ({
   })
)
export default class Page extends PureComponent{
   render(){
      return (         
         <div>Home</div>
      );
   }
}
