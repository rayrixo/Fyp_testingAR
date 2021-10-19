var watchID,geoLoc,target,travelMode;
var flag = false; 
var notAtTrail = true
var centered = false;
var completeButtonFlag = false;
var getRouteButtonFlag = false;
var gMarkers = []
var target = {latitude:1.379155,longitude:103.849828};

var localStorage= window.localStorage
if (localStorage.getItem('landmarkIndex')){
    var landmarkIndex=localStorage.getItem('landmarkIndex')
} else{
    var landmarkIndex = localStorage.setItem('landmarkIndex',0)
}

const Chinatown= [ 
    { 
        name: "Chinese Heritage Center", 
        location: { 
            lat: 1.283421, // add here latitude if using static data 
            lng: 103.844455, // add here longitude if using static data 
 
        },
        content:"Get transported back in time and experience the footsteps \n of migrants in the late 19th century of singapore",
        src:'https://rayrixo.github.io/Fyp_testingAR/testin.html' 
    }, 
 
    { 
        name: "Sri Maraimman Temple", 
        location:{ 
            lat:1.282644, 
            lng:103.845227, 
        },
        content:'This hindu temple is the oldest \n and largest of its kind in singapore'  
    }, 
 
    { 
        name: "Masjid Jamae", 
        location:{ 
            lat:1.283190, 
            lng:103.845329, 
        },
        content:'Established in 1826 it is one of the oldest mosque in \n singapore One of the only six in the \n country that conducts sermons in tamil' 
    }, 
 
    { 
        name: "Mural at Mohamed Ali Lane", 
        location:{ 
            lat:1.2827594818546095,  
            lng:103.84583411762635, 
        }, 
        content:'Witness murals that depict the past \n through the eyes of singaporean artist Yip Yew Chong.'
    }, 
 
    { 
        name: "Tong Heng", 
        location:{ 
            lat:1.281370, 
            lng:103.844937, 
        },
        content:'Tong Heng is the oldest confectioneries. \n Witness a story of resilience, \n determination and resourcefulness.' 
    }, 
 
    { 
        name: "Buddha Tooth Relic Temple", 
        location:{ 
            lat:1.281458, 
            lng:103.844192, 
        },
        content:'This place hold special meaning for buddhist people as it stores the left canine tooth of buddha' 
    }, 
 
    { 
        name: "Sago Street", 
        location:{ 
            lat:1.281683, 
            lng:103.844203, 
        },
        content:'Experience the street of the dead where immigrants of the past with no family lived and died'
    }, 
];

/**  waypoints: [
    {location:Chinatown[0].location},
    {location:Chinatown[1].location},
    {location:Chinatown[2].location},
    {location:Chinatown[3].location},
    {location:Chinatown[4].location},
    {location:Chinatown[5].location},
    {location:Chinatown[6].location},
    {location:Chinatown[7].location},
    {location:Chinatown[8].location},
    {location:Chinatown[9].location},
    {location:Chinatown[10].location},
    {location:Chinatown[11].location},
]  **/

var rad = function(x) {
    return x * Math.PI / 180;
};

function getDistance(mk1){
    var R = 6378137; // Radius of the Earth in miles
    var mk2 = {lat: 1.2827156284699024 ,lng:103.84397634403197 }
    var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
}

$('#dialog').hide();



function success(position) {
    var origin_lat = position.coords.latitude;
    var origin_lng = position.coords.longitude;
    origin = {lat : origin_lat , lng : origin_lng}
     // Icons
     var icons = {
        start: new google.maps.MarkerImage(
        "static/start.png",
        // (width,height)
        new google.maps.Size( 44, 44 ),
        // The origin point (x,y)
        new google.maps.Point( 0, 0 ),
        // The anchor point (x,y)
        new google.maps.Point( 22, 32 )
        )
    };
    
    var markers = {
        0 : new google.maps.MarkerImage(
            '',
            // (width,height)
            new google.maps.Size( 44, 44 ),
            // The origin point (x,y)
            new google.maps.Point( 0, 0 ),
            // The anchor point (x,y)
            new google.maps.Point( 22, 32 )
        ),
        1 : new google.maps.MarkerImage(
            '',
            // (width,height)
            new google.maps.Size( 44, 44 ),
            // The origin point (x,y)
            new google.maps.Point( 0, 0 ),
            // The anchor point (x,y)
            new google.maps.Point( 22, 32 )
        ),
    }
    

    const map = window.map
    window.map.addListener("drag",()=>{
        centered= false
    })
    
    
    document.getElementById("recenter").addEventListener("click", () => {
        centered = true
        console.log(centered)
        var latlng = new google.maps.LatLng(origin_lat,origin_lng)  
        map.setCenter(latlng)
        map.setZoom(18);
    })
    if (centered){
        console.log("CENTERING")
        var latlng = new google.maps.LatLng(origin_lat,origin_lng)
        map.setCenter(latlng)
        map.setZoom(18);    
    }
    if (target.latitude === origin_lat && target.longitude === origin_lng){
        alert("You have reached your desination")
        navigator.geolocation.clearWatch(watchID)
    } else{
        const directionsService = new google.maps.DirectionsService();
        const directionRenderer = new google.maps.DirectionsRenderer({preserveViewport:true});
        if(!completeButtonFlag){
            completeButtonFlag = true
            
             // --TO DO --  Display route on click
            document.getElementById("complete").addEventListener("click", () => {
                console.log("Compelte button pressed")
                landmarkIndex += 1 
                directionRenderer.set('directions', null)
                removeMarkers()
                
                directionsService.route({
                    origin : {lat:origin_lat, lng:origin_lng},
                    destination : Chinatown[landmarkIndex].location,   
                    travelMode: google.maps.TravelMode["WALKING"]
                }) .then((response)=>{
                    console.log(response)
                    directionRenderer.setDirections(response);
                    const route = response.routes[0];
                    var leg = route.legs[0]
                    instructions = leg["steps"][0].instructions + " "+ leg["steps"][0].distance.text + "  "+leg["steps"][0].duration.text
                    document.getElementById("instructions").innerHTML = instructions
                })  
                  
            })
        }

        directionRenderer.setMap(map);
        distance = getDistance(origin)
        // If not at trail yet
        if (distance<700){
            console.log(travelMode)
            if (flag){
                directionRenderer.setMap(null); 
                removeMarkers()
                directionsService.route({
                    origin : {lat:origin_lat, lng:origin_lng},
                    destination : Chinatown[0].location,   
                    travelMode: google.maps.TravelMode[travelMode]
                }) .then((response)=>{
                    directionRenderer.setDirections(response);
                    const route = response.routes[0];
                    var leg = route.legs[0]
                    instructions = leg["steps"][0].instructions + " "+ leg["steps"][0].distance.text + "  "+leg["steps"][0].duration.text
                    document.getElementById("instructions").innerHTML = instructions
                    gMarker = makeStartMarker(leg.start_location, leg.end_location)
                    gMarkers.push(gMarker)
                })
            }
            document.getElementById("submit").addEventListener("click", function showDialog() {
                flag = true
                $('#dialog').show();
                $('#dialog').dialog();
                $( "#dialog" ).on('dialogclose', function() {
                    travelMode = $('#option').val();
                    directionsService.route({
                        origin : {lat:origin_lat, lng:origin_lng},
                        destination : Chinatown[0].location,   
                        travelMode: google.maps.TravelMode[travelMode]
                    }) .then((response)=>{
                        directionRenderer.setDirections(response);
                        const route = response.routes[0];
                        var leg = route.legs[0]
                        instructions = leg["steps"][0].instructions + " "+ leg["steps"][0].distance.text + "  "+leg["steps"][0].duration.text
                        document.getElementById("instructions").innerHTML = instructions
                        gMarker = makeStartMarker(leg.start_location, leg.end_location)
                        gMarkers.push(gMarker)
                    })
                })  
            }) 
            
        }
        
        // If at the trail already
        // TO-DO For loop go through Chinatown[i].location and get route to next landmark
        else{
            if (flag){
                directionRenderer.setMap(null); 
                removeMarkers()
                directionsService.route({
                    origin : {lat:origin_lat, lng:origin_lng},
                    destination : Chinatown[landmarkIndex].location,   
                    travelMode: google.maps.TravelMode.WALKING
                }) .then((response)=>{
                    directionRenderer.setDirections(response);
                    const route = response.routes[0];
                    var leg = route.legs[0]
                    instructions = leg["steps"][0].instructions + " "+ leg["steps"][0].distance.text + "  "+leg["steps"][0].duration.text
                    document.getElementById("instructions").innerHTML = instructions
                    paths = response.routes[0].legs
                    gMarker = makeStartMarker(leg.start_location, leg.end_location)
                    gMarkers.push(gMarker)
                })
            } 

            if (!getRouteButtonFlag){
                // Set get route button 
                getRouteButtonFlag = true
                document.getElementById("submit").addEventListener("click", () => {
                    flag = true
                    directionsService.route({
                        origin : {lat:origin_lat, lng:origin_lng},
                        destination : Chinatown[landmarkIndex].location,
                        travelMode: google.maps.TravelMode.WALKING
                    }) .then((response)=>{
                        directionRenderer.setDirections(response);
                        const route = response.routes[0];
                        var leg = route.legs[0]
                        // TO-DO  Direction Instructions
                        instructions = leg["steps"][0].instructions + " "+ leg["steps"][0].distance.text + "  "+leg["steps"][0].duration.text
                        document.getElementById("instructions").innerHTML = instructions
                        paths = response.routes[0].legs
                        gMarker = makeStartMarker(leg.start_location, leg.end_location)
                        gMarkers.push(gMarker)
                    })
                }); 
            }
            
        }
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
        geoLoc = navigator.geolocation
        // Get current positon 
        var options = {
            enableHighAccuracy: true,
            maximumAge: 0
        };
        geoLoc.getCurrentPosition(currentPositionSuccess,currentPositionError,options)
        
            // timeout  in 60 seconds
        var options = {timeout:60000};
        
        // Watch position 
        watchID = geoLoc.watchPosition(success,errorHandler,options)
    } else{
        alert("Browser does not support geolocation!")
    }
}
function currentPositionSuccess(position){
    origin_lat = position.coords.latitude;
    origin_lng = position.coords.longitude
    window.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18,
        center: { lat: origin_lat, lng: origin_lng },
        zoomControl: false,
    });
}
function currentPositionError(err){
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function makeMarker( position, icon, title ) {
    marker = new google.maps.Marker({
     position: position,
     map: map,
     icon: icon,
     title: title
    });
    return marker
}

function makeStartMarker( position,direction) {
    
    var heading = google.maps.geometry.spherical.computeHeading(direction,position);
    var line=new google.maps.Polyline({
        clickable:false,
        map:map,strokeOpacity:0,
        path:[position,direction],
        icons:[{offset:'0%' ,
        icon:{
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale:7,
            strokeOpacity:1  
            }
        }]
    })
    return line
}

function removeMarkers (){
    for(i=0; i<gMarkers.length; i++){
        gMarkers[i].setMap(null);
    }
}

 