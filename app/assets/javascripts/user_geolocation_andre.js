$(document).ready(function(){

  var location = $("#location")

  $('#button').on('click', function(event){

    event.preventDefault();
    whereAmI();

    function whereAmI() {

      if (!navigator.geolocation){
        location.html("<p>Unfortunately, Geolocation is not supported by your browser. Please enter your address in the form.</p>");
        return;
      }

      function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;

        location.attr("data-lat", latitude)
        location.attr("data-lng", longitude)

        location.html('<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>');

        var img = new Image();
        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

        location.append(img);

        var user_location = {lat: location.attr("data-lat"), lng: location.attr("data-lng")};

        request = $.ajax({
          url: "bins/getlatlng",
          method: "post",
          data: user_location
        })
        .done(function(response){
          location.append(response);
        });

      };

      function error(error) {
        switch(error.code) {
        case error.PERMISSION_DENIED:
        location.html("User denied the request for Geolocation.")
        break;
        case error.POSITION_UNAVAILABLE:
        location.html("Location information is unavailable.")
        break;
        case error.TIMEOUT:
        location.html("The request to get user location timed out.")
        break;
        case error.UNKNOWN_ERROR:
        location.html("An unknown error occurred.")
        break;
        }
      };

      location.innerHTML = "<p>Locating…</p>";

      navigator.geolocation.getCurrentPosition(success, error);
    }

  })

})
