function initWalking(user_lat, user_lng, bin_lat, bin_lng) {
  var user = {lat: user_lat, lng: user_lng};
  var bin = {lat: bin_lat, lng: bin_lng};

  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: user
  });

  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('walking_directions'));

  calculateAndDisplayRoute(directionsService, directionsDisplay);


  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var start = user;
    var end = bin;
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.WALKING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}
