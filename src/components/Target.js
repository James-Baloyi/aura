import React from 'react';
import Image from '../images/target.png';

export default class Target extends React.Component{
    render(){
        return (
            <div className="target" onClick={this.props.onClick}>
            <center>
            <img src={Image}/>
            </center>
          </div>
        );
    }
}