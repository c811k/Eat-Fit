workoutBtn();

function workoutBtn () {
    var workBtn = $("<button>")
    .attr("type", "button")
    .attr("id", "workout-category")
    .addClass("btn btn-info")
    .attr("data-toggle", "modal")
    .attr("data-target", "#exampleModalLong")
    .text("Add Workout");

$(".input-group-append").append(workBtn);

$("#workout-category").on("click", function() {
    $("#select").change(function() {
        workBtn.text("Add Workout");
        var category = $(this).val();
        console.log(this);
        console.log(category);
        var queryURL = "https://wger.de/api/v2/exercise/?category=" + category + "&status=2";

        $.ajax ({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            $(".modal-body").empty();
            var results = response.results;
            for(var i =0; i <results.length; i++) {
                if(results[i].language === 2) {
                    var button = $("<button>")
                        .attr("type", "button")
                        .addClass("btn btn-sm btn-secondary btn-block")
                        .attr("title", results[i].name)
                        .attr("data-content", results[i].description)
                        .text(results[i].name)
                        .attr("data-trigger", "hover")
                        .attr("data-dismiss", "modal")
                        .popover("toggle");
                    $(".modal-body").append(button);        
                }                
            }
            $(".btn.btn-sm.btn-secondary.btn-block").on("click", function() {
                var type = $(this).text();
                $("#workout-category").text(type);
            });
        });
    });
    
});
}



