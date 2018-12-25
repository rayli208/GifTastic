//TAKE USER INPUT
var memes = [];

function renderButtons() {
  $("#meme-name-holder").empty();
  for (var i = 0; i < memes.length; i++) {
    var btn = $("<button>");
    btn.addClass("meme btn btn-warning btn-block text-white mb-2");
    btn.attr("data-name", memes[i]);
    btn.text(memes[i]);
    btn.on("click", handler);
    $("#meme-name-holder").append(btn);
  }
}

$("#add-meme").on("click", function(event) {
  event.preventDefault();
  var meme = $("#user-meme-input")
    .val()
    .trim();
  if(meme === ''){
    alert("Please enter something!")
    false;
  }else{
    memes.push(meme);
    renderButtons();
    $("#user-meme-input").val("");
  }
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
  }).then(function(response) {
    $("#all-memes").empty();
    var results = response.data;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='col-md-6 col-lg-4 col-12 mb-1'>");
      var rating = results[i].rating;
      var pRating = $("<p class='btn btn-warning btn-sm mt-2'>").text(
        "Rating: " + rating
      );
      var imgContainer = $("<p>");
      var linkContainer = $("<p>");
      var linkToImage = $("<a class='btn btn-warning btn-sm'>");
      linkToImage.attr("href", results[i].url);
      linkToImage.attr("target", "_blank");
      linkToImage.text("Link to Meme");

      var memeImage = $("<img>");
      memeImage.attr("src", results[i].images.fixed_height.url);
      memeImage.css("width", 150);
      memeImage.css("height", 150);

      imgContainer.append(memeImage);
      linkContainer.append(linkToImage);
      gifDiv.append(imgContainer);
      gifDiv.append(pRating);
      gifDiv.append(linkContainer);

      $("#all-memes").prepend(gifDiv);
    }
  });
}
