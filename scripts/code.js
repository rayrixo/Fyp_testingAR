window.onload = () => {

  var localStorage= window.localStorage 
  if (localStorage.getItem('landmarkIndex')){ 
      var landmarkIndex=localStorage.getItem('landmarkIndex'); 
  } else{ 
      var landmarkIndex = localStorage.setItem('landmarkIndex',0); 
  }
  
  const indexButton = document.getElementById('completeButton');
  indexButton.onclick = function(){
      i = landmarkIndex;
      landmarkIndex = localStorage.getItem('landmarkIndex');
      landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
      console.log(i);
      window.location = "https://rayrixo.github.io/Fyp_testingAR/testin.html";
    }
  
    const indexButton = document.getElementById('completeButton');
  indexButton.onclick = function(){
      i = landmarkIndex;
      landmarkIndex = localStorage.getItem('landmarkIndex');
      landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
      console.log(i);
      window.location = "https://rayrixo.github.io/Fyp_testingAR/SriMariamman.html";
    }
  
  
    const indexButton = document.getElementById('completeButton');
  indexButton.onclick = function(){
      i = landmarkIndex;
      landmarkIndex = localStorage.getItem('landmarkIndex');
      landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
      console.log(i);
      window.location = "./testin.html";
    }
  
  
  const indexButton = document.getElementById('completeButton');
  indexButton.onclick = function(){
  i = landmarkIndex;
  landmarkIndex = localStorage.getItem('landmarkIndex');
  landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
  console.log(i);
  window.location = "https://rayrixo.github.io/Fyp_testingAR/MasjidJamae.html";
  }
  
  
  
  
  const indexButton = document.getElementById('completeButton');
  indexButton.onclick = function(){
  i = landmarkIndex;
  landmarkIndex = localStorage.getItem('landmarkIndex');
  landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
  console.log(i);
  window.location = "https://rayrixo.github.io/Fyp_testingAR/TongHeng.html";
  }
  
  
  
  const indexButton = document.getElementById('completeButton');
  indexButton.onclick = function(){
      i = landmarkIndex;
      landmarkIndex = localStorage.getItem('landmarkIndex');
      landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
      console.log(i);
      window.location = "https://rayrixo.github.io/Fyp_testingAR/BuddhaToothRelic.html";
  }
  
  
  const indexButton = document.getElementById('completeButton');
  indexButton.onclick = function(){
      i = landmarkIndex;
      landmarkIndex = localStorage.getItem('landmarkIndex');
      landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
      console.log(i);
      window.location = "https://rayrixo.github.io/Fyp_testingAR/PagodaStreet.html";
    }
  
  
    const indexButton = document.getElementById('completeButton');
  indexButton.onclick = function(){
      i = landmarkIndex;
      landmarkIndex = localStorage.getItem('landmarkIndex');
      landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
      console.log(i);
      window.location = "https://rayrixo.github.io/Fyp_testingAR/SagoStreet.html";
    }
  
  
    const indexButton = document.getElementById('completeButton');
    indexButton.onclick = function(){
        i = landmarkIndex;
        landmarkIndex = localStorage.getItem('landmarkIndex');
        landmarkIndex = localStorage.setItem('landmarkIndex',++i);
    
        console.log(i);
        window.location = "https://rayrixo.github.io/Fyp_testingAR/MuralStreet.html";
      }
    
    
  
  
  
  
  // if(indexButton.clicked == true){
  //         localStorage.setItem('landmarkIndex',++i);
  // }
  
  
  }