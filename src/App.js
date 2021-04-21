import "./App.css";
import React from "react";
import Map from "./components/Map";
import PanicButton from "./components/PanicButton";
import Target from "./components/Target";
import Header from "./components/Header";
import LFH from "./components/LFH";
import Cancel from "./components/Cancel";
import Loading from "./components/Loading";
import DriverPanel from "./components/DriverPanel";

var touchesArray = new Array();

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      diff: 0,
      headerTitle: "Home",
      longButton: <PanicButton onTouchMove={(event)=>{this.handleTouch(event)}} onTouchEnd={(event)=>{this.endTouch(event)}}/>,
      smallButton: <Target/>,
      currentMap: <Map hasCoords={false}/>,
      driverData: {},
      driverPanel: <div></div>
    }
  }

  componentDidMount(){
    this.requestLocation();
  }

  requestLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          var coords = {lat: lat, lng: lng};
          this.setState({coords: coords});
          localStorage.setItem("mycoords", JSON.stringify(coords));
          this.setState({currentMap: <Map coords={coords} hasCoords={true}/>});
        });
    }
  }

  handleTouch(event){
    var thisTouch = event.changedTouches[0].screenX;
    touchesArray.push(thisTouch);
    var diff = touchesArray[touchesArray.length - 1] - touchesArray[0];
    var fingerTracker = document.getElementsByClassName("finger-tracker")[0];
    this.setState({diff: diff});
    fingerTracker.style.width = diff + "px";
  }

  endTouch(){
    var diff = touchesArray[touchesArray.length - 1] - touchesArray[0];
    var fingerTracker = document.getElementsByClassName("finger-tracker")[0];
    setTimeout(()=>{fingerTracker.style.width = 0 + "px"; this.setState({diff: 0})}, 300);
    if(parseInt(diff) > 200){
      navigator.vibrate([55,0]);
      this.createVisualConfirmation();
      this.setState({longButton: <LFH/>});
      this.setState({smallButton: <Cancel onClick={()=>{this.cancelHelp()}}/>});
      this.setState({headerTitle: "Waiting..."});
      document.getElementsByClassName("loading")[0].classList.remove("hidden");
    }
  }

  cancelHelp(){
    this.setState({longButton: <PanicButton onTouchMove={(event)=>{this.handleTouch(event)}} onTouchEnd={(event)=>{this.endTouch(event)}}/>})
    this.setState({smallButton: <Target onClick={()=>{this.requestLocation()}}/>});
    this.setState({headerTitle: "Home"})
    document.getElementsByClassName("loading")[0].classList.add("hidden");
  }

  createVisualConfirmation(){
    var app = document.getElementsByClassName("App")[0];
    app.style.height = window.screen.availHeight + "px";
    app.classList.add("flash");
    setTimeout(()=>{app.classList.remove("flash")}, 500);
    setTimeout(()=>{this.setState({driverPanel: <DriverPanel/>});document.getElementsByClassName("driver-panel")[0].classList.remove("hidden"); this.setState({headerTitle: "En Route"}); document.getElementsByClassName("loading")[0].classList.add("hidden");}, 3500);
  }

  render(){
  return (
    <div className="App">
      <Loading/>
      <Header title={this.state.headerTitle}/>
        {this.state.currentMap}
          <div className="bottom-controller">
          {this.state.longButton}
          {this.state.smallButton}
          {this.state.driverPanel}
        </div>
    </div>
  );
}
}

export default App;