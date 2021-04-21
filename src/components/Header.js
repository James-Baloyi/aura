import React from 'react';
import Image from '../images/menu.png';

export default class Header extends React.Component{
    render(){
        return (
        <div className="header">
         <h2>{this.props.title}</h2>

         <div className="menu">
        <img src={Image} className="menu-burger" onContextMenu={(event)=>{event.preventDefault()}}/>
        </div>
        </div>
        );
    }
}