$(document).ready(function(){

  var errors = $("#errors")
  var main = $(".main")

  $('.address_form').hide()

  $('.address').on('click', function(event){
    event.preventDefault();
    if ($('.address_form').is(":hidden")){
      $('.address').text("Cancel")
      $('.logo').animate({"margin-top": "0em"});
      $('.address_form').fadeIn();
    }
    else {
      $('.address').text("Input A NYC Address")
      $('.address_form').fadeOut();
      $('.logo').animate({"margin-top": "8em"});
    }

  })

   $('.success.button').on('click', function(event){
    event.preventDefault();
    $('.logo').children().animate({ "margin-left": ".5em" }, 100 )
    $('.logo').children().animate({ "height": "3em" }, 100 )
    $('.logo').animate({ "margin-top": "0em" }, 1000 );
    $('.main').animate({ "margin-top": "-4em" }, 1000 );
    var data = $(event.target).parent().serialize()
    $.ajax({
    url: "/bins/convert_to_latlng",
    method: "post",
    data: data
    })
    .done(function(response){
    main.html(response);
    });
  });

  $('.location').one('click', function(event){

    event.preventDefault();
    $('.logo').children().animate({ "margin-left": ".5em" }, 100 )
    $('.logo').children().animate({ "height": "3em" }, 100 )
    $('.logo').animate({ "margin-top": "0em" }, 1000 );
    $('.main').animate({ "margin-top": "-4em" }, 1000 );
    whereAmI();

    function whereAmI() {

      if (!navigator.geolocation){
        errors.html("<p>Unfortunately, Geolocation is not supported by your browser. Please enter your address in the form.</p>");
        return;
      }

      function success(position) {
        var user_location = {lat: position.coords.latitude, lng: position.coords.longitude};
        $.ajax({
          url: "/bins/getlatlng",
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

  $(document).on("submit", "#map-button", function(event){
  event.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    url: "/bins/getlatlng",
    method: "post",
    data: data
    })
    .done(function(response){
    main.html(response);
    });
  });

  $(document).on("submit", "#walking-button", function(event){
  event.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    url: "/bins/walking_directions",
    method: "post",
    data: data
    })
    .done(function(response){
    main.html(response);
    });
  });

  $(document).on("submit", "#streetview-button", function(event){
  event.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    url: "/bins/street_view",
    method: "post",
    data: data
    })
    .done(function(response){
    main.html(response);
    });
  });
})
