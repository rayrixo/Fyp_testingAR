window.onload = () => {

  var localStorage= window.localStorage 
  if (localStorage.getItem('landmarkIndex')){ 
      var landmarkIndex=localStorage.getItem('landmarkIndex'); 
  } else{ 
      var landmarkIndex = localStorage.setItem('landmarkIndex',0); 
  }


  const congratButton = document.getElementById('congrats_button');
  congratButton.onclick = function(){
    window.location = "https://rayrixo.github.io/Fyp_testingAR/main.html";
  }
  
  const indexButton_Testin = document.getElementById('complete_testin');
  indexButton_Testin.onclick = function(){
      i = landmarkIndex;
      landmarkIndex = localStorage.getItem('landmarkIndex');
      landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
      console.log(i);
      window.location = "https://rayrixo.github.io/Fyp_testingAR/testing_congrats.html";
    }
  
  //   const indexButton_Sri = document.getElementById('completeButton');
  // indexButton_Sri.onclick = function(){
  //     i = landmarkIndex;
  //     landmarkIndex = localStorage.getItem('landmarkIndex');
  //     landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
  //     console.log(i);
  //     window.location = "https://rayrixo.github.io/Fyp_testingAR/MasjidJamae.html";
  //   }
  
  
  
  // const indexButton = document.getElementById('completeButton');
  // indexButton.onclick = function(){
  // i = landmarkIndex;
  // landmarkIndex = localStorage.getItem('landmarkIndex');
  // landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
  // console.log(i);
  // window.location = "https://rayrixo.github.io/Fyp_testingAR/TongHeng.html";
  // }
  
  
  
  
  // const indexButton = document.getElementById('completeButton');
  // indexButton.onclick = function(){
  // i = landmarkIndex;
  // landmarkIndex = localStorage.getItem('landmarkIndex');
  // landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
  // console.log(i);
  // window.location = "https://rayrixo.github.io/Fyp_testingAR/BuddhaToothRelic.html";
  // }
  
  
  
  // const indexButton = document.getElementById('completeButton');
  // indexButton.onclick = function(){
  //     i = landmarkIndex;
  //     landmarkIndex = localStorage.getItem('landmarkIndex');
  //     landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
  //     console.log(i);
  //     window.location = "https://rayrixo.github.io/Fyp_testingAR/PagodaStreet.html";
  // }
  
  
  // const indexButton = document.getElementById('completeButton');
  // indexButton.onclick = function(){
  //     i = landmarkIndex;
  //     landmarkIndex = localStorage.getItem('landmarkIndex');
  //     landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
  //     console.log(i);
  //     window.location = "https://rayrixo.github.io/Fyp_testingAR/SagoStreet.html";
  //   }
  
  
  //   const indexButton = document.getElementById('completeButton');
  // indexButton.onclick = function(){
  //     i = landmarkIndex;
  //     landmarkIndex = localStorage.getItem('landmarkIndex');
  //     landmarkIndex = localStorage.setItem('landmarkIndex',++i);
  
  //     console.log(i);
  //     window.location = "https://rayrixo.github.io/Fyp_testingAR/SagoStreet.html";
  //   }
  
  
  //   const indexButton = document.getElementById('completeButton');
  //   indexButton.onclick = function(){
  //       i = landmarkIndex;
  //       landmarkIndex = localStorage.getItem('landmarkIndex');
  //       landmarkIndex = localStorage.setItem('landmarkIndex',++i);
    
  //       console.log(i);
  //       window.location = "https://rayrixo.github.io/Fyp_testingAR/MuralStreet.html";
  //     }
    
    
  
  
  
  
  // if(indexButton.clicked == true){
  //         localStorage.setItem('landmarkIndex',++i);
  // }
  
  
  }