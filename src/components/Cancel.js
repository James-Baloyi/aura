import React from 'react';
import Image from '../images/cancel.png';

export default class Target extends React.Component{
    render(){
        return (
            <div className="cancel" onClick={this.props.onClick}>
            <center>
            <img src={Image}/>
            </center>
          </div>
        );
    }
}