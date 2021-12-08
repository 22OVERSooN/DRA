function init(){
// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'

// var myMap = L.map("map").setView([-23.42,133.52],4);
  
//   //  Adding a tile layer (the background map image) to our map
//   // We use the addTo method to add objects to our map

//   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// }).addTo(myMap);

}

//find the button
var button = d3.select("#select-btn")

//find the type in
var typein = d3.select('#typein')


init();

// Create event handlers for clicking the button pressing the search key
button.on("click", runEnter)

function information(postcode){
    //create a list to resotre the locality,state,category
    var locality = []
    var state = []
    var category = []
    //use postcode in input cell here
    d3.json("resources/final.json").then((datas) => {
        datas.forEach(function(d){
            //push all the locality,state, category to list
            if(d['\ufeffpostcode'] === postcode){
                locality.push(d['locality'])
                console.log(locality)
                state.push(d['state'])
                category.push(d['Category'])
            }
        })
        var table = document.getElementById('rows')
        for(var i=0; i<state.length; i++) {
            console.log(i)
            var row = table.insertRow(-1);
            var cell1  = row.insertCell(0)
            var cell2  = row.insertCell(1)
            var cell3  = row.insertCell(2)
            var cell4  = row.insertCell(3)
            var cell5  = row.insertCell(4)
            if(category[i]===''){
                cell1.innerHTML = 'No'
            } else {
                cell1.innerHTML = 'Yes'
            }
            cell2.innerHTML = postcode
            cell3.innerHTML = locality[i]
            cell4.innerHTML = state[i]
            cell5.innerHTML = category[i]
        }
    })

}
function map(postcode) {
    //create a list to resotre the long and lat
    const long = []
    const lat = []
    // var postcode = `${postcode}`
    d3.json("resources/final.json").then((datas) => {
        datas.forEach(function(d){
            if(d['\ufeffpostcode'] === postcode){
                long.push(d['long'])
                lat.push(d['lat'])
            }
        })
        myMap = L.map("map").setView([lat[0],long[0]],12);
  
        //  Adding a tile layer (the background map image) to our map
        // We use the addTo method to add objects to our map
      
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 16,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: API_KEY
      }).addTo(myMap);
    })

}

function runEnter(){
    d3.event.preventDefault()
    var postcode1 = d3.select('#typein')
    var postcode = postcode1.property("value").trim()
    information(postcode)
    map(postcode)
}