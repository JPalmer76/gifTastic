$(document).ready(function() {
  // Initial array of Gifs
  var topics = ["honey boo boo"];
  renderButtons();

  // render buttons function
  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
    a.addClass("gifs");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
    
    }
  }


// add gif (input search) on click function
  $("#add-gif").on("click", function(event){
    event.preventDefault();
    var input = $("#gif-input").val().trim();
    console.log(input);
    var a = $("<button>");
    a.addClass("gifs");
    a.attr("data-name", input);
    a.text(input);
    $(a).hide(500).show(1000);
    $("#buttons-view").append(a);
    $("#gif-input").val("");
    
    

  })
  // Get input value from search on "submit"
  // make api call with ajax and adding the value
   $("#buttons-view").on("click", ".gifs", function(event) {
    event.preventDefault();
    var gifPicture = $(this).attr("data-name")
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=SCTZFGIpnkbisLwvI5TonrVEsJTSuiwG&q=" + gifPicture + "&limit=10&offset=0&rating=G&lang=en";
      console.log(queryURL)
   
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(results)
      var gif = $("#gif-input").val().trim();
     
      topics.push(gif);
     
      // loop throught the response(oject)
      for(let i = 0; i < response.data.length; i++) {
       console.log(i);
        var gifDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("state", "still");
        gifImage.addClass("gify");
        gifDiv.append(p);
        gifDiv.append(gifImage);
        $("#gifs-appear-here").prepend(gifDiv);
      }
      }) 
      
    
  });

  $(document).on("click", ".gify", function() {
    var state = $(this).attr("state");
    console.log(state)
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("state", "still");
    }
  });
  
   
  
  
});



