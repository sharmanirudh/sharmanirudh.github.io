"use strict";

$(window).ready(function() {
        $('.nav-btn').on('click', function () {
            $('header').toggleClass('header_bg');
            $('.nav-btn span').toggleClass('ion-ios-close ion-ios-menu');
            $('.menu_items').toggleClass('show');
            $('body').toggleClass('no-scroll');
        });
        $('.menu_item').on('click', function () {
            $('header').removeClass('header_bg');
            if($('.nav-btn span').hasClass('ion-ios-close')) {
                $('.nav-btn span').toggleClass('ion-ios-menu ion-ios-close');
            };
            $('.menu_items').removeClass('show');
            $('body').removeClass('no-scroll');
        });

    $('body').scrollspy({ 
        target: '#menu_items',
        offset: 50,
    });
});

$(window).load(function() {

    // $('#preloader').css("visibility", "hidden");
    // Splitting();

    moveHeadingParentStartCenter("about_heading", "about");
    moveHeadingParentStartCenter("hobbies_heading", "hobbies");
    moveHeadingParentStartCenter("contact_heading", "contact");

    var coursesRequest = new XMLHttpRequest();
    coursesRequest.open('GET', 'https://raw.githubusercontent.com/sharmanirudh/courses/master/courses.json');
    coursesRequest.onload = function() {
        var coursesData = JSON.parse(coursesRequest.responseText);
        renderCourses(coursesData["courses"]);
    };
    coursesRequest.send();

    // $(function () {
    //     $('[data-toggle="tooltip"]').tooltip({template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'});
    // });

    $("#fullscreen_pacman_btn").css({"height": $(".github_button").first().outerHeight() + "px", 
                                "width": Math.max($(".github_button").first().outerHeight(), $("#fullscreen_pacman_btn").outerWidth()) + "px"});

    $('#fullscreen_pacman_btn').click(function() {
        $("#game_fullscreen").css("visibility", "visible");
        $("#pacman_game_iframe").appendTo("#game_fullscreen");
        $("body").css("overflow", "hidden");
    });

    $("#exit_fullscreen").width($("#exit_fullscreen").height());

    $("#exit_fullscreen").click(function() {
        $("body").css("overflow", "visible");
        $("#pacman_game_iframe").appendTo("#pacman_game_background");
        $("#game_fullscreen").css("visibility", "hidden");
    });

    function renderCourses(data) {
        var htmlString = "";
        
        for (var i = 0; i < data.length; i++) {
            var statusBadgeClass = "success";
            if (data[i]["status"] != "Completed")
                statusBadgeClass = "warning";

            htmlString += '\
            <div class="card text-white col-10 col-sm-5 col-md-4 col-lg-3 mb-3 ml-sm-2 mr-sm-2"> \
                <div class="card-body"> \
                    <h6 class="card-title"><a href="' + data[i]["link"] + '" target="_blank">' + data[i]["name"] + '</a><span class="badge badge-' + statusBadgeClass + ' ml-1">' + data[i]["status"] + '</span></h6> \
                    <p class="card-text">'

            for (var j = 0; j < data[i]["skills_acquired"].length; j++) {
                htmlString += '<span class="course_chip">' + data[i]["skills_acquired"][j] + '</span>';
            }

            htmlString +='\
                    </p> \
                </div> \
            </div>'
        }
        $('#courses_container').html(htmlString);
    }

    function aboutImg() {
        $('.about_img_2.bottom').on('click', function () {
            $(this).addClass('top').removeClass('bottom');
            $('.about_img_1').addClass('bottom').removeClass('top');
        });
        $('.about_img_1').on('click', function () {
            $(this).addClass('top').removeClass('bottom');
            $('.about_img_2').addClass('bottom').removeClass('top');
        });
    };
    aboutImg();

    $(window).on("scroll touchmove", function() {

        function headerFixed() {
            if ($(window).scrollTop() >= 1) {
                $('header').addClass('header_fixed');
            } else {
                $('header').removeClass('header_fixed');
            }
        };
        headerFixed();

        $('.about_img_1').css({
            width: 120 + $(window).scrollTop()/110 + "%",
            bottom: 40 - $(window).scrollTop()/110 + "px"
        })

        var offset = 50;

        var navbar = document.getElementById('navbar');
        var navbarRect = navbar.getBoundingClientRect();

        var works = document.getElementById('works');
        var worksRect = works.getBoundingClientRect();

        var faceprint = document.getElementById('faceprint');
        var faceprintRect = faceprint.getBoundingClientRect();

        var nuaudi = document.getElementById('nuaudi');
        var nuaudiRect = nuaudi.getBoundingClientRect();

        var pacman = document.getElementById('pacman');
        var pacmanRect = pacman.getBoundingClientRect();
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
        
        // console.log("work : " + worksRect.top);
        // console.log("body : " + $(document).scrollTop());
        // console.log("skill : " + $("#skill").position().top + $("#skill").offset().top + $("#skill").outerHeight(true))
        
        if (navbarRect.bottom + offset >= worksRect.top && works.scrollTop <= worksRect.bottom) {
            $("body").css('background', $("#works").attr("data-color"));
            $("#works_heading").css({opacity: "0.5", color: "#ffffff"});
            [...document.getElementsByClassName("decibel_screenshot")].forEach(elem => {
                checkAnimation(elem, 'slide-in-br');
            });
        } else if(navbarRect.bottom < worksRect.top) {
            $("body").css('background', $("body").attr("data-color"));
            $("#works_heading").css({opacity: "0.1", color: "#ffffff"});
        }
        if (navbarRect.bottom + offset >= faceprintRect.top && faceprint.scrollTop <= faceprintRect.bottom) {
            $("body").css('background', "#66033c");
            checkAnimation($("#marquee"), "marquee");
        } else if(navbarRect.bottom > faceprintRect.bottom) {
            $("body").css('background', $("body").attr("data-color"));
        }
        if (navbarRect.bottom + offset >= pacmanRect.top && pacman.scrollTop <= pacmanRect.bottom) {
            $("body").css('background', "#101010");
        } else if(navbarRect.bottom > pacmanRect.bottom) {
            $("body").css('background', $("body").attr("data-color"));
        }
        if (navbarRect.bottom + offset >= nuaudiRect.top && nuaudi.scrollTop <= nuaudiRect.bottom) {
            $("body").css('background', "#01071e");
            checkAnimation($("#nuaudi_screenshots_background"), "slide-rotate-hor-b-fwd");
        } else if(navbarRect.bottom > nuaudiRect.bottom) {
            $("body").css('background', $("body").attr("data-color"));
        }

        (() => {
            // hobbies animation
            animateElement("tt_ball", "tt", 36.1665, 24.276, 14, -15);
            animateElement("tt_player", "tt", 33.176, 0, -5, -16, -25);
            animateElement("shuttle", "badminton", 0, 75.2647, 5, 5);
            animateElement("badminton_player", "badminton", 26.35, 0, -20, 10);
        })();
    });
    // onscroll ends

    // Bind to the resize event of the window object
    $(window).on("resize", function () {
        $("#tt").height( $('#tt').outerWidth() * 0.73721);
        $("#badminton").height( $('#badminton').outerWidth() * 0.60721);
    // Invoke the resize event immediately
    }).resize();

    // Check if it's time to start the animation.
    function checkAnimation(elem, animationClass) {
        var elem = $(elem);
        // If the animation has already been started
        if (elem.hasClass(animationClass)) return;
        // Start the animation
        elem.addClass(animationClass);
    }
    
    [...document.getElementsByClassName("decibel_screenshot")].forEach(element => {
        var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var widthScale, rightScale, bottomScale;

        var style = window.getComputedStyle(element);
        if (screen.width < 380) {
            widthScale = 0.55;
            rightScale = 3;
            bottomScale = 0.8;
        } else if (screen.width < 576) {
            widthScale = 0.49;
            rightScale = 3;
            bottomScale = 1.5;
        } else if (screen.width < 768) {
            widthScale = 0.65;
            rightScale = 2.35;
            bottomScale = 1.65;
        } else if (screen.width < 992) {
            widthScale = 0.75;
            rightScale = 2.1;
            bottomScale = 1.7;
        } else if (screen.width < 1200) {
            widthScale = 0.85;
            rightScale = 1.9;
            bottomScale = 1.8;
        } else {
            widthScale = 1.5;
            rightScale = 1;
            bottomScale = 1;
        }
        element.style.width = parseInt(element.style.width.split("%")[0]) / widthScale + "%";
        var style = window.getComputedStyle(element);
        element.style.right = parseInt(style.getPropertyValue('right').split('px')[0]) * rightScale + "px";
        element.style.bottom = parseInt(style.getPropertyValue('bottom').split('px')[0]) * bottomScale + "px";
    });
});

function animateElement(elementId, parentId, originalLeft, originalTop, percentIncreaseLeft, 
                        percentIncreaseTop, rotation = 0) {
    if (screen.width < 576) {
        var animStartOffset = 150; // in px
        var animEndOffset = 250; // in px
    } else if (screen.width < 768) {
        var animStartOffset = 150; // in px
        var animEndOffset = -50; // in px
    } else if (screen.width < 992) {
        var animStartOffset = 250; // in px
        var animEndOffset = 150; // in px
    } else if (screen.width < 1200) {
        var animStartOffset = 150; // in px
        var animEndOffset = 100; // in px
    } else {
        var animStartOffset = 150; // in px
        var animEndOffset = 100; // in px
    }
    var finalLeft = originalLeft + percentIncreaseLeft;
    var finalTop = originalTop + percentIncreaseTop;
    var screenBottom = window.scrollY + window.innerHeight;
    var parentTop = $('#' + parentId).offset().top;
    var parentBottom = $('#' + parentId).offset().top + $('#' + parentId).outerHeight();
    if (screenBottom >= parentTop + animStartOffset && screenBottom <= parentBottom + animEndOffset) {
        // console.log("window.scrollY : " + window.scrollY); // checked
        // console.log("window.innerHeight : " + window.innerHeight); // checked
        var parent = document.getElementById(parentId);
        var parentRect = parent.getBoundingClientRect();
        // console.log("parent left : " + parentRect.left);
        // console.log("parent top : " + parentRect.top);
        var element = document.getElementById(elementId);
        var elementRect = element.getBoundingClientRect();
        // console.log("element left : " + elementRect.left);
        // console.log("element top : " + elementRect.top);
        var parentTopFromDocument = parentRect.top + window.scrollY;
        // calculate height during which animation will play
        var parentAnimationHeight = parent.offsetHeight - animStartOffset + animEndOffset;
        var leftDisplacement = finalLeft - originalLeft;
        var topDisplacement = finalTop - originalTop;
        var distTravelledByScreenBottomInsideParent = screenBottom - (parentTopFromDocument + animStartOffset);
        var newLeft = originalLeft + leftDisplacement / parentAnimationHeight * distTravelledByScreenBottomInsideParent;
        var newTop = originalTop + topDisplacement / parentAnimationHeight * distTravelledByScreenBottomInsideParent;
        // console.log("newLeft : " + newLeft);
        // console.log("newTop : " + newLeft);
        element.style.left = newLeft + "%";
        element.style.top = newTop + "%";
        if (rotation != 0) {
            var newRotation = 0 + rotation / parentAnimationHeight * distTravelledByScreenBottomInsideParent;
            $('#' + elementId).css({'transform': 'rotate(' + newRotation + 'deg)',
                '-webkit-transform': 'rotate(' + newRotation + 'deg)',
                '-moz-transform': 'rotate(' + newRotation + 'deg)',
                '-ms-transform': 'rotate(-' + newRotation + 'deg)',
                '-o-transform': 'rotate(-' + newRotation + 'deg)'});
        }
    } 
}

function moveHeadingParentStartCenter(headingId, parentId) {
    var heading = document.getElementById(headingId);
    heading.style.lineHeight = "";
    var parent = document.getElementById(parentId);
    var style = window.getComputedStyle(parent);
    heading.style.marginTop = "-" + ((parseInt(style.getPropertyValue('padding-top').split('px')[0]) + 
        parseInt(window.getComputedStyle(heading).getPropertyValue('height').split('px')[0]) / 2)) + "px";
}