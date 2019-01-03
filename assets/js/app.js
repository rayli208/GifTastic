//TAKE USER INPUT
var memes = [];

//Loop through the memes array to add all searched memes
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

//Add a meme to the memes array
$("#add-meme").on("click", function(event) {
  event.preventDefault();
  var meme = $("#user-meme-input")
    .val()
    .trim();
  if (meme === "") {
    alert("Please enter something!");
    false;
  } else {
    memes.push(meme);
    renderButtons();
    $("#user-meme-input").val("");
  }
});

//Delete all searched memes
$("#delete-meme").on("click", function(event) {
  event.preventDefault();
  if (confirm("You sure you wanna delete all your precious memes :/?")) {
    memes = [];
    renderButtons();
    $("#user-meme-input").val("");
  } else {
    false;
  }
});

renderButtons();

//Display on screen in "memes generated" area
function handler(event) {
  event.preventDefault();
  var meme = $(this).attr("data-name");
  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${meme}&api_key=dc6zaTOxFJmzC&limit=10`;
  $("#meme-title").text(meme);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    regenerateImages(response.data);
  });
}

function regenerateImages(results) {
  $("#all-memes").empty();
  for (var i = 0; i < results.length; i++) {
    var gifDiv = $("<div class='col-md-6 col-lg-4 col-12 mb-1'>");
    var rating = results[i].rating;

    //Create button group
    var buttonGroup = $("<div class='btn-group btn-group-sm mb-3' role='group' aria-label='Basic example'>");
    //Create and append rating button
    var ratingButton = $("<button type='button' class='btn btn-primary'>").text(rating);
    buttonGroup.append(ratingButton);

    //Create Link button
    var linkButton = $("<button type='button' class='btn btn-outline-warning'>");
    var linkIcon = $("<i class='fas fa-link'>");
    linkButton.attr("href", results[i].url);
    linkButton.attr("target", "_blank");
    //Append link button to button group
    linkButton.append(linkIcon);
    buttonGroup.append(linkButton);

    //Create Favorite Button
    var heartButton = $("<button type='button' class='btn btn-outline-danger'>");
    var heartIcon = $("<i class='fas fa-heart'>");
    heartButton.append(heartIcon);
    buttonGroup.append(heartButton);

    var imgContainer = $("<p>");
    //Create the meme image and give it all of its attributes for still images and moving images
    var memeImage = $("<img>");
    memeImage.attr("data-still", results[i].images.original_still.url);
    memeImage.attr("data-animate", results[i].images.fixed_height.url);
    memeImage.attr("data-state", "still");
    memeImage.attr("src", results[i].images.original_still.url);
    memeImage.on("click", animate);
    imgContainer.append(memeImage);
    gifDiv.append(imgContainer);
    gifDiv.append(buttonGroup);

    $("#all-memes").prepend(gifDiv);
  }
}

function animate(event) {
  event.preventDefault();
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}
