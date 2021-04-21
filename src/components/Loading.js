import React from 'react';
import Image from '../images/loader.png';

export default class LFH extends React.Component{
    render(){
        return (
            <div className="loading hidden">
                <center>
                <img src={Image}/>
                </center>
            </div>
        );
    }
}