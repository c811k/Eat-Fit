
var select;
var workout = $('.btn btn-info btn-sm').click(function() {
        return select = this;
    });
    renderWorkouts();

    function getWorkouts() {
        return JSON.parse(localStorage.getItem("myworkout"))
    }

    function renderWorkouts() {
        var workouts = getWorkouts();
        for (day in workouts) {
            $(`#${day}`).text("");
            workouts[day].forEach(workout => {
                var div = $("<div>").text(workout)
                $(`#${day}`).append(div); 
            });
        }
    }
 

var myWorkouts = {
    monday:[],
    tuesday:[],
    wednesday:[],
    thursday:[],
    friday:[],
    saturday:[],
    sunday:[]
}

var currentSelectedDay;
var currentSelectedType;


$(".workout-category").click(function(){
    currentSelectedDay = $(this).data("day");
})

$(".custom-select").on("change", function() {
    var category = $(this).val();
    // console.log(this);
    // console.log(category);
    var queryURL = "https://wger.de/api/v2/exercise/?category=" + category + "&status=2";
    
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#workout-body").empty();
        var results = response.results;
        // console.log(results);
        for(var i =0; i <results.length; i++) {
            if(results[i].language === 2) {
                var button = $("<button>")
                    .attr("type", "button")
                    .addClass("btn btn-sm btn-outline-secondary btn-block")
                    .attr("data-trigger", "hover")
                    .attr("title", results[i].name)
                    .attr("data-content", results[i].description)
                    .text(results[i].name)
                    .popover("toggle")
                $("#workout-body").append(button);        
            }                
        }

        $(".btn.btn-sm.btn-outline-secondary.btn-block").on("click", function() {
            var type = $(this).text();
            currentSelectedType = type;
            $("#workout-save").on("click", function() {
                myWorkouts[currentSelectedDay].push(currentSelectedType);
                myWorkouts[currentSelectedDay] = [...new Set(myWorkouts[currentSelectedDay])] // remove duplicates
                localStorage.setItem("myworkout", JSON.stringify(myWorkouts));
                renderWorkouts();
            });
        });
    });
});





