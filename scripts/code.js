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
           },
           model:'assets/buster_drone/scene.gltf'

       },

        {
            name: 'YCK',
            location: {
                lat: 1.381590,
                lng: 103.844905,
            },
            model:'assets/asset.gltf'

        },
        
        {
            name: 'Block_A',
            location: {
                lat: 1.380099,
                lng: 103.848593,
            },
            model:'assets/asset.gltf'

        },


        {
            name: 'Block_L',
            location: {
                lat: 1.379198,
                lng: 103.849562,
            },
            model:'assets/buster_drone/scene.gltf'

        },
       
   ];
}





function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;
       let model = place.model

       let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       model.setAttribute('gltf-model', `${model}`);
       model.setAttribute('look-at','[gps-camera]');
       model.setAttribute('scale', '4 4 4');
       model.setAttribute('position','0 20 100');

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       scene.appendChild(model);
   });
}