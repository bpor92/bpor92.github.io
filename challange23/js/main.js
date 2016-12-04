function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav__list") {
        x.className += " responsive";

    } else {
        x.className = "topnav__list";
    }
}


$(document).on('click', function (event) {
        if ($(event.target).closest('#myTopnav').length == false) {
            $(".topnav__list").removeClass('responsive');
            
        }
    });

$('a[href^="#"]').on('click', function(event) {

    var target = $(this.getAttribute('href'));

    if( target.length ) {
        event.preventDefault();
        $('#myTopnav').removeClass('responsive');
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1300);
    }
});