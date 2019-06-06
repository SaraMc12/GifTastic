
      // Initial array of movies
      var GiphyArray = ["guilty dogs", "funny cats", "Steve Harvey", "weird"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayGiphyInfo() {
        var api = "ITVhc68FGtOj9RgX4TLyrvLeTu3pqhqs";
        var Giphy = $(this).attr("data-Giphy");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + Giphy + "&api_key=" + api + "&limit=10";


        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          // $("#movies-view").empty();

          console.log(queryURL)
          $("#Giphy-view").empty();

          //  <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">


          for (var i = 0; i < response.data.length; i++) {

            // Creates an element to have the rating displayed
            // Displays the rating
            var rating = $("<div>");
            rating.html("Giphy rating: " + response.data[i].rating);
            $("#Giphy-view").append(rating);

            var image = $("<img>");
            image.attr("src", response.data[i].images.original_still.url)

            console.log(response.data[i].images.original_still.url)
            image.attr("data-still", response.data[i].images.original_still.url)
            image.attr("data-animate", response.data[i].images.original.url)
            image.attr("data-state", "still")
            image.attr("class", "imageClick")
            $("#Giphy-view").append(image);

          }


          $(".imageClick").on("click", function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");


            }
          })




          // Puts the entire Movie above the previous movies.
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();


        // Loops through the array of movies
        for (var i = 0; i < GiphyArray.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("Giphy");
          // Added a data-attribute
          a.attr("data-Giphy", GiphyArray[i]);
          // Provided the initial button text
          a.text(GiphyArray[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add movie button is clicked
      $("#add-Giphy").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var Giphy = $("#Giphy-input").val().trim();

        // The movie from the textbox is then added to our array
        GiphyArray.push(Giphy);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".Giphy", displayGiphyInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
    