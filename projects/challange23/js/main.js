$(function(){

    $('.btn-hamburger').on('click', function(){
        $('#myTopnav').toggleClass('responsive');
    });


    $(window).on('scroll', function() {
                $('.topnav__item a').each(function(index, value) {
                    var target = value.hash,
                        start = $(target).offset().top,
                        end = start + $(target).outerHeight(),
                        scrollPosition = $(window).scrollTop() + 90;     
                    if( (start <=  scrollPosition) && (scrollPosition <= end) ) {
                        $(value).closest('a').addClass('active');
                    }else {
                        $(value).closest('a').removeClass('active');
                    }
                    if(target === '#about'){
                        $('a[href$="home"]').removeClass('active')
                    }
                });
            });

    $(document).on('click', function (event) {
            if ($(event.target).closest('#myTopnav').length == false) {
                $(".topnav__list").removeClass('responsive');
                
            }
        });

    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        $('.topnav__item a').removeClass('active')
        $(this).addClass('active');
        if( target.length ) {
            event.preventDefault();
            $('#myTopnav').removeClass('responsive');
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1300);
        }
    });


});


