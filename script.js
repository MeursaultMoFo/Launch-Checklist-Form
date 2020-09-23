// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h3>Mission Destination</h3>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/


// form validation
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let fuel = document.querySelector("input[name=fuelLevel]");     
   let cargo = document.querySelector("input[name=cargoMass]");
   
   form.addEventListener("submit", function(event) {  
     let pilot = document.querySelector("input[name=pilotName]");
     let copilot = document.querySelector("input[name=copilotName]");
    
     if (pilot.value === ""  || copilot.value === "" || fuel.value === "" || cargo.value === "") {
         alert("All fields are required!");
         // stop the form submission
         event.preventDefault();
      }
      //prevents page from reloading
      event.preventDefault()
   });
 
   form.addEventListener("submit", function(event) {
       var letters = /^[a-zA-Z]+$/;
       let pilot = document.querySelector("input[name=pilotName]");
       let copilot = document.querySelector("input[name=copilotName]");
       if (pilot.value.match(letters)) {
           return true;
       } else {
           alert("Please use letters only for names.");
           event.preventDefault();
       }
       //prevents page from reloading
       event.preventDefault()
   });
 
   let button = document.getElementById("formSubmit");
   let status1 = document.getElementById("pilotStatus");
   let pilot = document.querySelector("input[name=pilotName]");
   let status2 = document.getElementById("copilotStatus");
   let copilot = document.querySelector("input[name=copilotName]");
   let status3 = document.getElementById("fuelStatus");
   let status4 = document.getElementById("cargoStatus");
   // updates status info
   function change() {
      status1.innerHTML = "Pilot " + pilot.value + " is ready";
      //console.log(pilotInput.value);
      status2.innerHTML = "Co-pilot " + copilot.value + " is ready";
      status3.innerHTML = "Fuel level " +fuel.value+ " is high enough for launch";
      status4.innerHTML = "Cargo mass " +cargo.value+ " is low enough for launch";
 
     // checks for errors & shows success or failure
     if (fuel.value < 10000) {
       let f401 = document.querySelector("#faultyItems");
       f401.style.visibility = "visible";
       status3.innerHTML = "Fuel level " +fuel.value+ " is NOT high enough for launch";
       let error = document.getElementById("launchStatus");
       error.innerHTML = "Shuttle NOT ready for launch";
       error.style.color = "red";
     } else if (cargo.value > 10000) {
       let c401 = document.querySelector("#faultyItems");
       c401.style.visibility = "visible";
       status4.innerHTML = "Cargo mass " +cargo.value+ " is NOT low enough for launch";
       let error = document.getElementById("launchStatus");
       error.innerHTML = "Shuttle NOT ready for launch";
       error.style.color = "red";
     } else {
       let success = document.getElementById("launchStatus");  
       success.innerHTML = "Shuttle is ready for launch";
       success.style.color = "green";
     }
     
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
   // Access the JSON in the response
   response.json().then( function(json) {
       console.log(json[0]);
       const div = document.getElementById("missionTarget");
       // Add HTML that includes the JSON data
       div.innerHTML = `
          <h2>Mission Destination</h2>
          <ol>
          <li>Name: ${json[0].name}</li>
          <li>Diameter: ${json[0].diameter}</li>
          <li>Star: ${json[0].star}</li>
          <li>Distance from Earth: ${json[0].distance}</li>
          <li>Number of Moons: ${json[0].moons}</li>
          </ol>
          <img src="${json[0].image}">
         `;
      } );
   });

   }
    
   button.addEventListener("click", change);
   
});