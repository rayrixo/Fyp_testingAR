window.location.reload(true) = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            // name:'YCK',
            // location:{
            //     lat: 1.372190,
            //     lng: 103.848320 
            //     },

            // name:'block A',
            // location:{
            //     lat: 1.380061558329711,
            //     lng: 103.84853482246399
            // },

            // name:'block L',
            // location:{
            //     lat:1.3792464031689677,
            //     lng:103.84980618953705
            // },

            name:'Testing',
            location:{
                lat:1.3780183070377627,
                lng:103.84999930858613
            }

            // name:'Home',
            // location:{
            //     lat:1.444260,
            //     lng:103.797142
            // }
            
        },
    ];
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;

       let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       model.setAttribute('gltf-model', 'assets/asset.gltf');
       model.setAttribute('animation-mixer', '');
       model.setAttribute('scale', '0.05 0.05 0.05');


       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       scene.appendChild(model);
   });
}

Cache.delete()