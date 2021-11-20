function init(){
// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map").setView([-23.42,133.52],4);
  
  //  Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);

}
var button = d3.select('')
init();

function information(postcode){
    //create a list to resotre the locality,state,category
    const locality = []
    const state = []
    const category = []
    var postcode = `${postcode}`
    d3.json("resources/final.json").then((datas) => {
        console.log(datas)
        datas.forEach(function(d){
            if(d['\ufeffpostcode'] === postcode){
                locality.push(d['locality'])
                state.push(d['state'])
                category.push(d['category'])
            }
        })
    })

}

function map(postcode) {
    //create a list to resotre the long and lat
    const long = []
    const lat = []
    var postcode = `${postcode}`
    d3.json("resources/final.json").then((datas) => {
        console.log(datas)
        datas.forEach(function(d){
            if(d['\ufeffpostcode'] === postcode){
                long.push(d['long'])
                lat.push(d['lat'])
            }
        })
    })
    var myMap = L.map("map").setView([lat[0],long[0]],15);
  
  //  Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);
}

function optionChanged1(postcode){
    information(postcode)
    map(postcode)
}