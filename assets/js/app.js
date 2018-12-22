//TAKE USER INPUT
var memes = [];

function alertmemeName() {
  var memeAlert = $(this).attr("data-name");
  alert(memeAlert);
}

function renderButtons() {
  $("#meme-name-holder").empty();
  for (var i = 0; i < memes.length; i++) {
    var a = $("<a>");
    a.addClass("meme btn btn-warning btn-block text-white mb-2");
    a.attr("data-name", memes[i]);
    a.text(memes[i]);
    $("#meme-name-holder").append(a);
  }
}

$("#add-meme").on("click", function (event) {
  event.preventDefault();
  var meme = $("#user-meme-input").val().trim();
  memes.push(meme);
  renderButtons();
});

$(document).on("click", ".meme", alertmemeName);
renderButtons();

//DISPLAY ON SCREEN