window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
    document.querySelector(".say-hi-button").addEventListener("click",function(){
        alert("Hi There!");
    });

};



function staticLoadPlaces() {
   return [
       {
           name: 'Testing',
           location: {
               lat: 1.378043,
               lng: 103.850071,
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
       let test = place.test

       let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       model.setAttribute('gltf-model', `${test}`);
       model.setAttribute('look-at','[gps-camera]');
       model.setAttribute('scale', '2 2 2');
       model.onclick = function(event){

        alert("Hello!");
    
    }
    //    model.setAttribute('position','0 40 100');

       scene.appendChild(model);
   });
}