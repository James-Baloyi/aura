const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({origin:true}));

var response = {
  name: "Jian Yang Chi",
  car: "Volskwagen",
  plate: "CXG 811 L",
  profile_url: "https://openpsychometrics.org/tests/characters/test-resources/pics/SV/10.jpg",
  current_coords: {
    lat: -26.1182913123122,
    lng: 27.88999954040404
  }
};

app.get('/get-driver', (req, res) => {
  var drivers = [{
    name: "Jian Yang Chi",
    car: "Volskwagen",
    plate: "CXG 811 L",
    profile_url: "https://openpsychometrics.org/tests/characters/test-resources/pics/SV/10.jpg",
    current_coords: {
      lat: -26.1182913123122,
      lng: 27.88999954040404
    }
  },
  {
    name: "Prince Philip",
    car: "Jaguar XJ Sentinel",
    plate: "BG 54 LL GP",
    profile_url: "https://www.hellomagazine.com/imagenes/royalty/20210305108277/prince-philip-moved-to-king-edward-hospital-vii/0-522-708/prince-philip-back-to-hospital-t.webp?filter=high",
    current_coords: {
      lat: -26.3182913123122,
      lng: 26.8999954040404
    }
  }]
  response = drivers[Math.floor(Math.random() * drivers.length)];
  if(response !== "" || response !== null){
  return res.status(200).send(response);
  }
});

exports.app = functions.https.onRequest(app);
