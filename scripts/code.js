var watchID,geoLoc,target,origin_lat,origin_lng;
var flag = false; 
target = {latitude : 1.377587,longitude: 103.850036};

const loadPlaces = function(coords) {
    // COMMENT FOLLOWING LINE IF YOU WANT TO USE STATIC DATA AND ADD COORDINATES IN THE FOLLOWING 'PLACES' ARRAY
    // const method = 'api';

    const Chinatown = [ 
        { 
            name: "Chinese Heritage Center", 
            location: { 
                lat: 1.283421, // add here latitude if using static data 
                lng: 103.844455, // add here longitude if using static data 
     
            } 
        }, 
     
        { 
            name: "Sri Maraimman Temple", 
            location:{ 
                lat:1.282644, 
                lng:103.845227, 
            } 
        }, 
     
        { 
            name: "Masjid Jamae", 
            location:{ 
                lat:1.283190, 
                lng:103.845329, 
            } 
        }, 
     
        { 
            name: "Mural at Mohamed Ali Lane", 
            location:{ 
                lat:1.2827594818546095,  
                lng:103.84583411762635, 
            } 
        }, 
     
        { 
            name: "Tong Heng", 
            location:{ 
                lat:1.281370, 
                lng:103.844937, 
            } 
        }, 
     
        { 
            name: "Buddha Tooth Relic Temple", 
            location:{ 
                lat:1.281458, 
                lng:103.844192, 
            } 
        }, 
     
        { 
            name: "Sago Street", 
            location:{ 
                lat:1.281683, 
                lng:103.844203, 
            } 
        }, 
     
        { 
            name: "Chinatown Visitor Centre", 
            location:{ 
                lat:1.281790, 
                lng:103.844128, 
            } 
        }, 
     
        { 
            name: "Chinatown Food Street", 
            location:{ 
                lat:1.282301956083743, 
                lng:103.8439297409357, 
            } 
        }, 
     
        { 
            name: "Chinatown Complex", 
            location:{ 
                lat:1.2827469159145881,  
                lng:103.84318438315941, 
            } 
        }, 
        { 
            name: "Nams Supplies", 
            location:{ 
                lat:1.2821764238861229,  
                lng:103.8444112397504, 
            } 
        }, 
        { 
            name: "Thian Hock Keng Temple", 
            location:{ 
                lat:1.2810767548472404,  
                lng:103.84769333260996 , 
            } 
        }, 
        { 
            name: "My Awesome Café", 
            location:{ 
                lat:1.2801230681341091,  
                lng:103.84719956266558,  
            } 
        }, 
    ];

    // if (method === 'api') {
    //     return loadPlaceFromAPIs(coords);
    // }

    return Promise.resolve(Chinatown);
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

                    // add place icon
                    const icon = document.createElement('a-image');
                    icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                    icon.setAttribute('name', place.name);
                    icon.setAttribute('src', './assets/map-marker.png');
                    

                    // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
                    icon.setAttribute('scale', '40, 40');

                    icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

                    // const clickListener = function(ev) {
                    //     ev.stopPropagation();
                    //     ev.preventDefault();

                    //     const name = ev.target.getAttribute('name');

                    //     const el = ev.detail.intersection && ev.detail.intersection.object.el;

                    //     if (el && el === ev.target) {
                    //         const label = document.createElement('span');
                    //         const container = document.createElement('div');
                    //         container.setAttribute('id', 'place-label');
                    //         label.innerText = name;
                    //         container.appendChild(label);
                    //         document.body.appendChild(container);

                    //         setTimeout(() => {
                    //             container.parentElement.removeChild(container);
                    //         }, 2500);
                    //         window.location.href = "https://google.com";
                    //     }
                    // };
                    icon.addEventListener('click',function(){
                        window.location.href = "https://google.com";
                    });
                  
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