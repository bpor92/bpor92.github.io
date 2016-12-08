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



    $('.project-container__item').on('click', function(){
        var divId = $(this).attr('data-div');
        $(divId).stop().fadeToggle();
    });
    $(document).mouseup(function (e){
        var container = $(".project-container__technology");
        if (!container.is(e.target)){   
            container.fadeOut();  
        }
    });


    $(window).on('resize scroll', function() {
        var y = $(document).scrollTop();
        var z = $(window).height();
        var w = $(window).width();
        if(w > 849){
            if(y >= z){
            $('.topnav__logo-name').addClass('topnav__logo-name--fixed')
            $('.topnav__list').addClass('topnav__list--fixed')
            $('.topnav__logo').addClass('topnav__logo--fixed')
            $('.topnav').addClass('topnav--fixed')
            $('.topnav__a-item').addClass('topnav__a-item--fixed')

            }else{
            $('.topnav__logo-name').removeClass('topnav__logo-name--fixed')
            $('.topnav__list').removeClass('topnav__list--fixed')
            $('.topnav__logo').removeClass('topnav__logo--fixed')
            $('.topnav').removeClass('topnav--fixed')
            $('.topnav__a-item').removeClass('topnav__a-item--fixed')

            }
        }else{
            $('.topnav__logo-name').addClass('topnav__logo-name--fixed')
            $('.topnav__list').removeClass('topnav__list--fixed')
            $('.topnav__logo').removeClass('topnav__logo--fixed')
            $('.topnav').removeClass('topnav--fixed')
            $('.topnav__a-item').removeClass('topnav__a-item--fixed')
        }
        

    });

});
