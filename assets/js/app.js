//TAKE USER INPUT
var memes = ["trump", "taco"];

function renderButtons() {
  $("#meme-name-holder").empty();
  for (var i = 0; i < memes.length; i++) {
    var btn = $("<button>");
    btn.addClass("meme btn btn-warning btn-block text-white mb-2");
    btn.attr("data-name", memes[i]);
    btn.text(memes[i]);
//    btn.on("click", handler);
    $("#meme-name-holder").append(btn);
  }
  $("button").on("click", handler);
}

$("#add-meme").on("click", function (event) {
  event.preventDefault();
  var meme = $("#user-meme-input").val().trim();
  memes.push(meme);
  renderButtons();
  $("#user-meme-input").val('');
});

renderButtons();

//DISPLAY ON SCREEN
function handler() {
  event.preventDefault();
  var meme = $(this).attr("data-name");
  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${meme}&api_key=dc6zaTOxFJmzC&limit=10`;
  $("#meme-title").text(meme);

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function (response) {
      $("#all-memes").empty();
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='col-md-6 col-lg-4 col-12 mb-1'>");

        var memeImage = $("<img>");
        memeImage.attr("src", results[i].images.fixed_height.url);
        memeImage.css("width", 150);
        memeImage.css("height", 150)

        gifDiv.prepend(memeImage);

        $("#all-memes").prepend(gifDiv);
      }
    });
}