// const { text } = require("stream/consumers");

var watchID,geoLoc,target,origin_lat,origin_lng;
var flag = false; 
target = {latitude : 1.377587,longitude: 103.850036};

const loadPlaces = function(coords) {
    // COMMENT FOLLOWING LINE IF YOU WANT TO USE STATIC DATA AND ADD COORDINATES IN THE FOLLOWING 'PLACES' ARRAY
    // const method = 'api';

    const chinatown = [ 
        { 
            name: "Chinese Heritage Center", 
            location: { 
                lat: 1.445757, // add here latitude if using static data 
                lng: 103.795065, // add here longitude if using static data 
     
            },
            content:"Get transported back in time and experience the footsteps \n of migrants in the late 19th century of singapore",
            src:'https://rayrixo.github.io/Fyp_testingAR/testin.html'
        }, 
     
        { 
            name: "Sri Maraimman Temple", 
            location:{ 
                lat:1.445405, 
                lng:103.795335, 
            },
            content:'This hindu temple is the oldest \n and largest of its kind in singapore',
            src:'https://rayrixo.github.io/Fyp_testingAR/SriMariamman.html'  
        }, 
     
        { 
            name: "Masjid Jamae", 
            location:{ 
                lat:1.445077, 
                lng:103.794433, 
            },
            content:'Established in 1826 it is one of the oldest mosque in \n singapore One of the only six in the \n country that conducts sermons in tamil',
            src:'https://rayrixo.github.io/Fyp_testingAR/MasjidJamae.html' 
        }, 
     
        { 
            name: "Mural at Mohamed Ali Lane", 
            location:{ 
                lat:1.2827594818546095,  
                lng:103.84583411762635, 
            }, 
            content:'Witness murals that depict the past \n through the eyes of singaporean artist Yip Yew Chong.',
            src:'https://rayrixo.github.io/Fyp_testingAR/MuralStreet.html'
        }, 
     
        { 
            name: "Tong Heng", 
            location:{ 
                lat:1.281370, 
                lng:103.844937, 
            },
            content:'Tong Heng is the oldest confectioneries. \n Witness a story of resilience, \n determination and resourcefulness.',
            src:'https://rayrixo.github.io/Fyp_testingAR/TongHeng.html'
        }, 
     
        { 
            name: "Buddha Tooth Relic Temple", 
            location:{ 
                lat:1.281458, 
                lng:103.844192, 
            },
            content:'This place hold special meaning for buddhist people as it stores the left canine tooth of buddha',
            src:'https://rayrixo.github.io/Fyp_testingAR/BuddhaToothRelic.html' 
        }, 


        { 
            name: "Pagoda Street", 
            location:{ 
                lat:1.283330, 
                lng:103.844450, 
            },
            content:'This place hold special meaning for buddhist people as it stores the left canine tooth of buddha',
            src:'https://rayrixo.github.io/Fyp_testingAR/PagodaStreet.html' 
        },
     
        { 
            name: "Sago Street", 
            location:{ 
                lat:1.281683, 
                lng:103.844203, 
            },
            content:'Experience the street of the dead where immigrants of the past with no family lived and died',
            src:'https://rayrixo.github.io/Fyp_testingAR/SagoStreet.html' 
        }, 
    ];


    // if (method === 'api') {
    //     return loadPlaceFromAPIs(coords);
    // }

    return Promise.resolve(chinatown);
};

// getting places from REST APIs
function loadPlaceFromAPIs(position) {
    const params = {
        radius: 300,    // search places not farther than this value (in meters)
        clientId: 'CRDMPAGPE4KCZOMKKCLKKSJOKUKJZVE54LUROL2GLDS3UMTA',
        clientSecret: 'TCWSXDU33J30GFTTPDRVL4SXMGMT3ON0ZWZVXWQPPINDMMWD',
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
    };

    // CORS Proxy to avoid CORS problems
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // Foursquare API
    const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=15
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};


window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // then use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;
                    const content = place.content;
                    const src = place.src;

                    // add place icon
                    const icon = document.createElement('a-image');
                    icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                    icon.setAttribute('name', place.name);
                    icon.setAttribute('src', './assets/map-marker.png');
                    icon.setAttribute('look-at','[gps-camera]');
                    

                    // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
                    icon.setAttribute('scale', '10, 20');

                    icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

                    const clickListener = function(ev) {
                        ev.stopPropagation();
                        ev.preventDefault();

                        const name = ev.target.getAttribute('name');

                        const el = ev.detail.intersection && ev.detail.intersection.object.el;

                        if (el && el === ev.target) {
                            const label = document.createElement('span');
                            const container = document.createElement('div');
                            const para = document.createElement('p');
                            const butt = document.createElement('a');
                            
                            butt.setAttribute('class','btn btn-secondary');
                            butt.setAttribute('href',src);                            
                            container.setAttribute('id', 'place-label');
                            label.innerText = name;
                            para.innerText = content;
                            butt.innerText = "More Info";
                            container.appendChild(label);
                            label.appendChild(para);
                            label.appendChild(butt);
                            
                            document.body.appendChild(container);

                            setTimeout(() => {
                                container.parentElement.removeChild(container);
                            }, 3500);
                        }
                    };

                    icon.addEventListener('click', clickListener);

                    // icon.addEventListener('click',function(){
                    //     window.location.href = "https://rayrixo.github.io/Fyp_testingAR/testin.html";
                    // });
                  
                    scene.appendChild(icon);
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 20000,
        }
    );
};

//code for the drop down menu
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  } 


function success(position) {
    var origin_lat = position.coords.latitude;
    var origin_lng = position.coords.longitude;
    if (target.latitude === origin_lat && target.longitude === crd.longitude){
        navigator.geolocation.clearWatch(watchID)
    }

    const directionsService = new google.maps.DirectionsService();
    const directionRenderer = new google.maps.DirectionsRenderer();

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: { lat: origin_lat, lng: origin_lng },
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
    });
    directionRenderer.setMap(map);
    if (flag==true){
        directionsService.route({
                origin : {lat:origin_lat, lng:origin_lng},
                destination : {lat:1.379155,lng:103.849828},
                waypoints: [
                    {location:{lat:1.380062,lng:103.848594}}
                ],
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.WALKING,
            }) .then((response)=>{
                directionRenderer.setDirections(response);
                const route = response.routes[0];
                const summaryPanel = document.getElementById("directions-panel")
                summaryPanel.innerHTML="";

                //For each route, display information
                for (let i = 0; i < route.legs.length; i++) {
                    const routeSegment = i + 1;

                    summaryPanel.innerHTML +=
                    "<b>Route Segment: " + routeSegment + "</b><br>";
                    summaryPanel.innerHTML += route.legs[i].start_address + " to ";
                    summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
                    summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
                }
            })
    } else{
        document.getElementById("submit").addEventListener("click", () => {
            flag = true
            directionsService.route({
                origin : {lat:origin_lat, lng:origin_lng},
                destination : "Nanyang Polytechnic Block L,180 Ang Mo Kio Ave 8,Singapore 569830",
                waypoints: [
                    {location:{lat:1.379992,lng:103.848457}}
                ],
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.WALKING,
            }) .then((response)=>{
                directionRenderer.setDirections(response);
                const route = response.routes[0];
                const summaryPanel = document.getElementById("directions-panel")
                summaryPanel.innerHTML="";

                //For each route, display information
                for (let i = 0; i < route.legs.length; i++) {
                    const routeSegment = i + 1;

                    summaryPanel.innerHTML +=
                    "<b>Route Segment: " + routeSegment + "</b><br>";
                    summaryPanel.innerHTML += route.legs[i].start_address + " to ";
                    summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
                    summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
                }
            })
        }); 
    }
    
    }

    function errorHandler(err) {
    if(err.code == 1) {
        alert("Error: Access is denied!");
    } else if( err.code == 2) {
        alert("Error: Position is unavailable!");
    }
    }
function getLocationUpdate(){
    if (navigator.geolocation){
        // timeout  in 60 seconds
        var options = {timeout:60000};
        geoLoc = navigator.geolocation
        watchID = geoLoc.watchPosition(success,errorHandler,options)
    } else{
        alert("Browser does not support geolocation!")
    }
}