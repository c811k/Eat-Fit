
var select;
var workout = $("<button>")
    .attr("type", "button")
    .attr("id", "workout-category")
    .addClass("btn btn-info btn-sm")
    .attr("data-toggle", "modal")
    .attr("data-target", "#workout-modal")
    .text("Add Workout")
    .click(function() {
        return select = this;
    });

$(".workout-button").append(workout);

$(".custom-select").on("change", function() {
    var category = $(this).val();
    console.log(this);
    console.log(category);
    var queryURL = "https://wger.de/api/v2/exercise/?category=" + category + "&status=2";
    
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#workout-body").empty();
        var results = response.results;
        for(var i =0; i <results.length; i++) {
            if(results[i].language === 2) {
                var button = $("<button>")
                    .attr("type", "button")
                    .addClass("btn btn-sm btn-outline-secondary btn-block")
                    .attr("data-trigger", "hover")
                    .attr("data-toggle", "body")
                    .attr("title", results[i].name)
                    .attr("data-content", results[i].description)
                    .text(results[i].name)
                    // .popover("toggle")
                $("#workout-body").append(button);        
            }                
        }

        $(".btn.btn-sm.btn-outline-secondary.btn-block").on("click", function() {
            var type = $(this).text();
            $("#workout-save").on("click", function() {
                $(select).text(type);  
            });
        });
    });
});




