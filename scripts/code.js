window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
   
};

function staticLoadPlaces() {
   return [
       {
           name: 'Testing',
           location: {
               lat: 1.444260,
               lng: 103.797142,
           },
           test:'assets/asset.gltf'

       },

        {
            name: 'YCK',
            location: {
                lat: 1.381590,
                lng: 103.844905,
            },
            test:'assets/asset.gltf'

        },
        
        {
            name: 'Block_A',
            location: {
                lat: 1.380099,
                lng: 103.848593,
            },
            test:'assets/asset.gltf'

        },


        {
            name: 'Block_L',
            location: {
                lat: 1.379198,
                lng: 103.849562,
            },
            test:'assets/asset.gltf'

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
        model.setAttribute('gltf-model', `${test}`);
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('scale', '5 5 5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}