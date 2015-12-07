$(document).ready(function(){

  var location = $("#location")

  $('#button').on('click', function(event){

  event.preventDefault();
  getLocation();

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          location.html("Geolocation is not supported by this browser.");
      }
  }

  function showPosition(position) {
      location.html("Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude);
  }

  function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            location.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            location.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            location.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            location.innerHTML = "An unknown error occurred."
            break;
    }
  }

  })

})
