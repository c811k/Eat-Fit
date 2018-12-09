$.noConflict();
jQuery(document).ready(function($){
    // Search for food
    $("#run-search").on("click", function(event) {
        $("#save").hide();
        $("#food").empty();
        $("#search-term").empty();
        var userInput = $("#search-term").val().trim();
        console.log(userInput);
        $.ajax({
            url:"https://api.edamam.com/search?q=" + userInput + "&app_id=19ca9465&app_key=deb24b5cfa66feacc7907e46eb56b09a&yield=1",
            method:"GET"
        }).then(function(response) {
            for (let number = 0 ; number < 10 ; number++ ) {
                var food = response.hits[number].recipe.label;
                var foodButton = $("<button>");
                foodButton.attr("data-name",food);
                foodButton.html((number+1) + ". " + food)
                $("#food").append(foodButton);
                $("#food").append("<br>")
            }
            console.log(response);  
        });  
    })
    
    $("#food").on("click" ,"button" , function(e){
        var selected = $(this).data("name").trim();
        $.ajax({
            url:"https://api.edamam.com/search?q=" + selected + "&app_id=19ca9465&app_key=deb24b5cfa66feacc7907e46eb56b09a&yield=1",
            method:"GET"
        }).then(function(data){
            console.log(data.hits[0]);
            $("#save").show();
            $("#food").empty();
            $("#detail").text(selected);
            $("#detail").append("<br>");
            var cal = (data.hits[0].recipe.calories)/(data.hits[0].recipe.yield);
            $("#detail").append("Calories : "+cal.toFixed(2));
            for (let i = 0 ; i < data.hits[0].recipe.ingredients.length ; i++) {
                var ingredients = data.hits[0].recipe.ingredients[i].text;
                $("#detail").append("<br>");
                $("#detail").append((i+1) + ". " +ingredients);
            }
        })
    });

    $("#run-search").on( "click", function() {
        $('#myModal1').modal('hide');  
    });
    //trigger next modal
    $("#run-search").on( "click", function() {
        $('#exampleModalLong').modal('show');  
    });
    function clear() {
        $("#food").empty();
        $('#myModal1').modal('hide');  
        console.log("hello");
      }
   
    // $("#clear-all").on("click", clear);


});