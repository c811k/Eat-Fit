$(function () {
    $('[data-toggle="popover"]').popover()
  
})

var select;
var isEmpty = true;
var workout = $('.btn btn-info btn-sm').click(function() {
        return select = this;
    });


    function getWorkouts() {
        return JSON.parse(localStorage.getItem("myworkout"))
    }

    function renderWorkouts() {
        var workouts = getWorkouts();
        console.log(workouts)
        for (var day in workouts) {
            if (workouts[day].length > 0){
                isEmpty = false;
            }
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

renderWorkouts();
if (!isEmpty) {
    myWorkouts = getWorkouts();
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
                    .addClass("btn btn-sm workout")
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
                console.log("pre", myWorkouts);
                myWorkouts[currentSelectedDay].unshift(currentSelectedType);
                myWorkouts[currentSelectedDay] = [...new Set(myWorkouts[currentSelectedDay])]
                console.log("post", myWorkouts); // remove duplicates
                localStorage.setItem("myworkout", JSON.stringify(myWorkouts));
                renderWorkouts();
            });
        });
    });
});





