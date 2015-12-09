$(document).ready(function(){

  var errors = $("#errors")
  var main = $(".main")

  $(document).on("submit", ".button_to", function(event){
  event.preventDefault();
  data = $(this).serialize;
  console.log("please");
  debugger
  $.ajax({
    url: "bins/walking_directions",
    method: "post",
    data: user_location
    })
    .done(function(response){
    main.html(response);
    });
  });

  $('.button').one('click', function(event){

    event.preventDefault();
    whereAmI();

    function whereAmI() {

      if (!navigator.geolocation){
        errors.html("<p>Unfortunately, Geolocation is not supported by your browser. Please enter your address in the form.</p>");
        return;
      }

      function success(position) {
        var user_location = {lat: position.coords.latitude, lng: position.coords.longitude};
        $.ajax({
          url: "bins/getlatlng",
          method: "post",
          data: user_location
        })
        .done(function(response){
          main.html(response);
        });
      };

      function error(error) {

        switch(error.code) {

        case error.PERMISSION_DENIED:
        errors.html("User denied the request for Geolocation.")
        break;
        case error.POSITION_UNAVAILABLE:
        errors.html("Location information is unavailable.")
        break;
        case error.TIMEOUT:
        errors.html("The request to get user location timed out.")
        break;
        case error.UNKNOWN_ERROR:
        errors.html("An unknown error occurred.")
        break;
        }
      };

      navigator.geolocation.getCurrentPosition(success, error);
    }

  })

})
