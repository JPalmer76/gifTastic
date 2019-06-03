$(document).ready(function() {
  // Initial array of Gifs
  var topics = ["honey Boo Boo", "grumpy cat", "puking", "dogs", "cats"];

  // GLobal variables

  var input = $("#gif-input");
  // var submit = $("#submit");
  // var apiKey = "SCTZFGIpnkbisLwvI5TonrVEsJTSuiwG";

  // render buttons
  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("Gifs");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#buttons-view").append(a);
    }
  }

  // Get inout value from search on "submit"
   

  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gifPicture = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      gifPicture +
      "&api_key=OcU56NBTWY5dF3inq3DPRQNfBYZbrgkN&limit=10";
      console.log(queryURL)
   
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response)
      var results = response.data;
      var gif = $(input).val().trim();
      topics.push(gif);
      renderButtons();
      
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height.url);
        gifDiv.append(p);
        gifDiv.append(gifImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
  });
  renderButtons();
});



// $.ajax({
//   url: giphyUrl,
//   method: "GET"
// }).then(function (r) {
//   for (var i = 0; i < r.data.length; i++) {
//     var url = r.data[i].images.fixed_width.url;
//     console.log(url);
//     var giphyImg = $("<img>");
//     giphyImg.attr("src", url);
//     $("#imgId").append(giphyImg);
//   }

// })
