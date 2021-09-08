window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       {
           name: 'Testing',
           location: {
               lat: 1.378043,
               lng: 103.850071,
           }

       },

        {
            name: 'YCK',
            location: {
                lat: 1.381590,
                lng: 103.844905,
            }

        },
        
        {
            name: 'Block_A',
            location: {
                lat: 1.380099,
                lng: 103.848593,
            }

        },


        {
            name: 'Block_L',
            location: {
                lat: 1.379198,
                lng: 103.849562,
            }

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
       model.setAttribute('look-at','[gps-camera]');
       model.setAttribute('scale', '4 4 4');
       model.setAttribute('position','0 20 100');

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       scene.appendChild(model);
   });
}