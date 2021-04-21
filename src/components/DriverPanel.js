import React from 'react';

export default class DriverPanel extends React.Component{
    constructor(){
        super();
        this.state = {
            driverData: "",
        }
    }

    componentDidMount(){
        var url = "https://us-central1-my-awesome-project-ebf03.cloudfunctions.net/app/get-driver";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
          if(xhr.readyState == "4" && xhr.status == "200"){
            var driverData = xhr.response;
            this.setState({driverData: JSON.parse(driverData)});
            localStorage.setItem("driver_coordinates", driverData.coords);
            this.mockProgress();
        }
        }
        xhr.send();
    }

    startCalculateDistance(){
        var driver_coords = this.state.driverData.current_coords;
        var lc_user_coords = localStorage.getItem("mycoords");
        var user_coords = JSON.parse(lc_user_coords);
        this.calculateDistance(user_coords, driver_coords);
    }

    calculateDistance(origin, driver){
        var origin = `${origin.lat},${origin.lng}`;
        const key = 'AIzaSyDDMIizZ49AcXojEeG1Qmckb-uduyvX6hY';
        const url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+origin+'&destinations=' + driver.lat + "," + driver.lng+'&key='+key;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if(xhr.status == '200' & xhr.readyState == '4'){
                var response = JSON.parse(xhr.response);
                var eta = response.rows[0].elements[0].duration.text;
                var distance = response.rows[0].elements[0].distance.text;
                //this.setProgress(eta)
            }
      }
       xhr.send();
    }

    mockProgress(){
        document.getElementsByClassName("progress-bar")[0].classList.add("full");
        setTimeout(()=>{document.getElementsByClassName("header-text")[0].innerText = "ARRIVED"}, 250000);
    }

    render(){
        if(this.state.driverData != null || this.state.driverData != ""){
        return(
            <div className="driver-panel hidden">
                <div className="ix-blocker"></div>
                <div className="progress-tracker">
                    <div className="progress-bar"></div>
                </div>

                <center>
                    <h2 className="header-text">HELP IS COMING</h2>
                    </center>
                <div className="profile-pic-container">
                    <img src={this.state.driverData.profile_url}/>
                </div>
                <br/>
                <center>
                <div className="driver-details">
                    <h3 className="header-text little-up">{this.state.driverData.name}</h3>
                    <p className="small-header little-up">{this.state.driverData.car}</p>
                    <p className="small-header little-up">{this.state.driverData.plate}</p>
                </div>
                <button className="big-cancel" onClick={()=>{window.location.reload()}}>CANCEL</button>
                </center>
            </div>
        );
        }else{
            return (<div className="driver-panel hidden"></div>);
        }
    }
}