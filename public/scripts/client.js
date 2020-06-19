/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//Function to create new tweet element
const createTweetElement = function(tweet) {

  //Calculate date in days
  const postDate = new Date(tweet.created_at);
  const currentDate = new Date();
  let Difference_In_Time = currentDate.getTime() - postDate.getTime();   
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
  Difference_In_Days = Difference_In_Days.toFixed(0); 

  const $tweet = $(
  `<article class="tweetContainer">
      <header class="tweetList-header">
          <div class="url">
            <img src=${tweet.user.avatars}>
            </img>
          <div class="name">
            ${tweet.user.name}
          </div>
          </div>
          <div>
            ${tweet.user.handle}
          </div>
      </header>
      <p>
        ${escape(tweet.content.text)}
      </p>
      <hr>
      <footer>
        ${Difference_In_Days} days ago 
        <i class="fa fa-flag">&nbsp;<i class="fa fa-retweet">&nbsp;<i class="fa fa-heart"></i></i></i> 
      </footer>
    </article>`);

  return $tweet;
}
// loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTweets = function(tweets) {
    $.each(tweets, (index,tweet) => {
      const tweetElement = createTweetElement(tweet);

      $('.tweetList').prepend(tweetElement);
    })
  }


$(document).ready(function () {

  //Hide the error message box while initial loading
  $("#errorMsg").hide();

  //To go back the focus to tweetarea and scroll top of the page
  $(".doubleArrow").on('click',function(event){
    $( ".tweetarea" ).focus();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  })

  //Function for loading all tweets
  function loadTweets() {
    $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'GET',
        dataType: 'JSON'
      }).then(function(response) {
          renderTweets(response);
      })
  }

  $('form').on('submit', function (event) {
    event.preventDefault();
    let max = 140;
    let len = $('#tweet-text').val().length;

    //checking whether the tweet area contain value
    if(len === 0){
      $("#errorMsg").empty()
      $("#errorMsg").slideDown();
      $("#errorMsg").append("<i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> &nbsp; Your tweet is too short &nbsp; <i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i>");

    //checking whether the tweet area contain more value

    }else if(len > max){
      $("#errorMsg").empty()
      $("#errorMsg").slideDown();
      $("#errorMsg").append("<i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> &nbsp; Your tweet is too long &nbsp; <i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i>");
    } else {
      $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'POST',
        data: $(this).serialize()
      }).then(function() {
        $('.tweetList').empty()
        loadTweets();
        $('#tweet-text').val('');
        $('#counter').val(140);
      })
    }
  })

  loadTweets();
});