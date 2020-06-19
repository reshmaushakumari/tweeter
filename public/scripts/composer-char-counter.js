$(document).ready(function () {
  // --- If any event keyboard event happens ---
  $("#tweet-text").on('click keypress keyup keydown change', function () {
    $("#errorMsg").hide();
    $("output").html(140 - this.value.length);

   // For toggle color red and black when counter value goes negative and comes back positive
     let currentLength = 140 - this.value.length;
    if(currentLength < 0) {
      $("output").removeClass("counterblack").addClass("counterred");
    } else {
      $("output").removeClass("counterred").addClass("counterblack");
    }
  });
});

$(document).on('mouseover','article.tweetContainer',function(){
  $("article.tweetContainer").css("box-shadow", "10px 10px");
});

$(document).on('mouseout','article.tweetContainer',function(){
  $("article.tweetContainer").css("box-shadow", "0px 0px");
});