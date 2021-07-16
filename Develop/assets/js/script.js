var ToDoIdCounter = 0;
var toDo = JSON.parse(localStorage.getItem("toDo"));

if (!toDo) {
    toDo = [];
    saveTask();
}


function blockUpdate(time) {
    $("#currentDay").text(time.format("DD/MM/YYYY hh:mm:ss A"));
    
}

function saveTask(task, setTime) {
    localStorage.setItem("toDo", JSON.stringify(toDo));
}

// Hour block generator
for (let i = 0; i < 24; i++) {
    $("<div>")
        .addClass("row")
        .append($("<div>")
            .addClass("col-1 hour")
            .text(moment()
                .subtract(3 - i, "hours")
                .format("hh A"))
        )

        .append($("<div>")
            .addClass(function () {
                if (i < 3) {
                    return "col-10 past";
                } else if (i === 3) {
                    return "col-10 present"
                } else {
                    return "col-10 future"
                }
            })
        )
        .append($("<button>")
            .addClass("col-1 saveBtn")
            .html("<i class='fas fa-save'></i>")
        )
        .attr("id", i)
        .appendTo($(".container"))
}

//Clock
blockUpdate(moment());
setInterval(function () {
    blockUpdate(moment());
}, 1000);