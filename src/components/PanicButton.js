import React from 'react';
import Image from '../images/slider.png';

export default class PanicButton extends React.Component{
    render(){
        return (
            <div className="swiper" onClick={(event)=>{event.preventDefault()}} onTouchStart={this.props.onTouchStart} onTouchMove={this.props.onTouchMove} onTouchEnd={this.props.onTouchEnd}>
            <div className="finger-tracker"></div>
            <center>
            <div className="swipe-img">
            <img src={Image}/>
            </div>
            <div className="swipe-text">
              SLIDE FOR HELP
            </div>
            </center>
          </div>
        );
    }
}