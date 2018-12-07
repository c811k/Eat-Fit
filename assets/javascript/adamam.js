$(document).ready(function() {
    var food = "grill chicken"
    $.ajax({
        url:"https://api.edamam.com/search?q=" + food + "&app_id=19ca9465&app_key=deb24b5cfa66feacc7907e46eb56b09a&yield=1",
        method:"GET"
    }).then(function(response){
        console.log("Food : " + response.hits[0].recipe.label); // food name
        var cal = (response.hits[0].recipe.calories)/response.hits[0].recipe.yield
        for (let i = 0 ; i < response.hits[0].recipe.ingredients.length ; i++) {
            var ingredients = response.hits[0].recipe.ingredients[i].text;
            console.log("Ingredients : " + ingredients);
        }
       
        console.log("Calories ( per 1 serving ) : " +cal); // cal per 1 serving
        
    })
});