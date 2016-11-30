function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";

    } else {
        x.className = "topnav";
    }
}

$(document).on('click', function (event) {
        if ($(event.target).closest('#myTopnav').length == false) {
            $(".topnav").removeClass('responsive');
        }
    });