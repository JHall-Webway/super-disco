var tasks = []
//Assigning moments to time blocks
$(".hour").each(function (index) {
    $(this).text(moment(6, "HH00")
        .add(index, "hours")
        .format("HH00")
    )
})
//Loads tasks into time blocks
var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
        tasks = []
    }
    $(".row").each(function (index) {
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            var timeID = $(this)
            .children(".hour")
            .text()
            if (task.time === timeID) {
                $(this).children(".col-10").text(task.task)
            }
        }
    })
}
//Saves tasks to local storage
var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
//Updates time blocks, loads tasks
function updateTime(time) {
    $("#currentDay").text(time.format("DD/MM/YYYY hh:mm:ss"));
    $(".row").each(function (index) {
        var timeID = parseInt($(this)
            .children(".hour")
            .text()
        )

        if (parseInt(time.format("HH00")) > timeID) {
            $(this).children(".col-10").removeClass("past present future").addClass("past")
        } else if (parseInt(time.format("HH00")) === timeID) {
            $(this).children(".col-10").removeClass("past present future").addClass("present")
        } else {
            $(this).children(".col-10").removeClass("past present future").addClass("future")
        }
    })
}
//Open edit window
$(".row").on("click", ".col-10", function () {
    var text = $(this).text()
    var textInput = $("<textarea>")
        .val(text)
        .addClass("col-10");
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});
//Save Button
$(".row").on("click", ".fas", function () {

    var rowNum = $(this)
        .parent()
        .parent()
        .children(".hour")
        .text();

    var saveBox = $(this)
        .parent()
        .parent()
        .children(".col-10")

    var text = saveBox.val();

    var savedTask = $("<div>")
        .text(text)
        .addClass("col-10 future")

    var taskObj = {
        task: text,
        time: rowNum
    }

    tasks.push(taskObj);
    saveTasks();
    saveBox.replaceWith(savedTask);
})
//Clock
setInterval(function () {
    var time = moment();
    updateTime(time);
}, 1000);
updateTime(moment(), tasks);
loadTasks();