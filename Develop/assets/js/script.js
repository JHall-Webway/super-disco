function updateTime(time, task) {
    $("#currentDay").text(time.format("DD/MM/YYYY hh:mm:ss"));
    $(".row").each(function (index) {
       var timeID = parseInt($(this)
            .children(".hour")
            .text()
            .split(" ")[0])
        
        $(this).attr("id", timeID)

       if (parseInt(time.format("H")) > timeID) {
           $(this).children(".col-10").removeClass("past present future").addClass("past")
       } else if (parseInt(time.format("H")) === timeID) {
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
    var saveBox = $(this)
        .parent()
        .parent()
        .children(".col-10")
    
    var text = saveBox.val();

    var savedTask = $("<div>")
        .text(text)
        .addClass("col-10 future")
    console.log(text)
    saveBox.replaceWith(savedTask);
})
//Clock
setInterval(function () {
    var time = moment();
    updateTime(time, "clock");
}, 1000);

$(".hour").each(function (index) {
    $(this).text(moment(6, "HH")
        .add(index, "hours")
        .format("H A")    
    )
})

updateTime(moment());