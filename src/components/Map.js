import React from 'react';


export default class Map extends React.Component{
    componentDidMount(){
        document.getElementsByClassName("map")[0].style.height = window.screen.height + "px";
    }

    render(){
        var url = "https://onecab.co.za/m/m2.html?user_lat=04&user_lng=0";
        if(this.props.hasCoords == true){
            url = `https://onecab.co.za/m/m2.html?user_lat=${this.props.coords.lat}&user_lng=${this.props.coords.lng}`;
        }
        return(
            <iframe className="map" src={url}>
            </iframe>
        )
        }
    }