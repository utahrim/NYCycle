
  var main = $(".main")

  $('#street-button').on('click', function(event){

    event.preventDefault();
    data = $(this).serialize()
    debugger

     $.ajax({
        url: "bins/street_view",
        method: "post",
        data: data
      })
      .done(function(response){
        main.html(response);
      });

  });
