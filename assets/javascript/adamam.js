$(document).ready(function ($) {
    $.noConflict();
    var buttonClicked;
    var currentRecipe;
    var buttonDiv = $("<button>")
        .attr("type", "button")
        .addClass("btn btn-primary btn-lg")
        .text("add meal")
        .attr("data-toggle", "modal")
        .attr("data-target", "#myModal1");
    buttonDiv.click(function (e) {
        return buttonClicked = this;
    })
    $(".buttonDiv").append(buttonDiv);

    $("#run-search").on("click", function (event) {
        $("#save").hide();
        $("#food").empty();
        $("#detail").empty();
        if (userInput !== "") {
            var userInput = $("#search-term").val().trim();
            console.log(userInput);
            $.ajax({
                url: "https://api.edamam.com/search?q=" + userInput + "&app_id=19ca9465&app_key=deb24b5cfa66feacc7907e46eb56b09a&yield=1",
                method: "GET"
            }).then(function (response) {
                for (let number = 0; number < 10; number++) {
                    var food = response.hits[number].recipe.label;
                    var foodButton = $("<button>");
                    foodButton.attr("data-name", food);
                    foodButton.html((number + 1) + ". " + food)
                    $("#food").append(foodButton);
                    $("#food").append("<br>")
                }
            });
        }
    });

    $("#food").on("click", "button", function (e) {
        var selected = $(this).data("name").trim();
        $.ajax({
            url: "https://api.edamam.com/search?q=" + selected + "&app_id=19ca9465&app_key=deb24b5cfa66feacc7907e46eb56b09a",
            method: "GET"
        }).then(function (data) {
            $("#save").show();
            $("#food").empty();
            $("#detail").html("<h5>" + selected + "</h5>");
            $("#exampleModalLong").css({ "overflow": "auto" });
            $("#detail").append($("<img>").attr("src", data.hits[0].recipe.image));
            $("#detail").append("<br>");
            var cal = (data.hits[0].recipe.calories) / (data.hits[0].recipe.yield);
            $("#detail").append("Calories(per 1 serving) : " + cal.toFixed(2));
            for (let i = 0; i < data.hits[0].recipe.ingredients.length; i++) {
                var ingredients = data.hits[0].recipe.ingredients[i].text;
                $("#detail").append("<br>");
                $("#detail").append((i + 1) + ". " + ingredients);
            }

            $("#save").on("click", function (e) {
                $('#exampleModalLong').modal('hide');
                $(buttonClicked).text(selected);
                $(buttonClicked).attr("data-recipe", JSON.stringify(data.hits[0].recipe));
                $(buttonClicked).click(function (e) {
                    $(this).attr("data-target", "#exampleModalLong");
                        currentRecipe = {...JSON.parse($(this).attr("data-recipe"))};
                        $("#save").show();
                        $("#food").empty();
                        $("#detail").html("<h5>" + selected + "</h5>");
                        $("#exampleModalLong").css({ "overflow": "auto" });
                        $("#detail").append($("<img>").attr("src", currentRecipe.image));
                        $("#detail").append("<br>");
                        var cal = (currentRecipe.calories) / (currentRecipe.yield);
                        $("#detail").append("Calories(per 1 serving) : " + cal.toFixed(2));
                        for (let i = 0; i < currentRecipe.ingredients.length; i++) {
                            var ingredients = currentRecipe.ingredients[i].text;
                            $("#detail").append("<br>");
                            $("#detail").append((i + 1) + ". " + ingredients);
                        }   
                })
            });
        })
    });

    $("#run-search").on("click", function () {
        $('#myModal1').modal('hide');
    });
    //trigger next modal
    $("#run-search").on("click", function () {
        $('#exampleModalLong').modal('show');
    });
    function clear() {
        $("#food").empty();
        $('#myModal1').modal('hide');
        $("#exampleModalLong").modal('hide');
        console.log("hello");
    }

    $(".clear-all").on("click", clear);
    

});