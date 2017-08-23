var toggle = $(".main-nav__toggle"),
    list = $(".main-nav__list"),
    active = $(".main-nav__active"),
    nav = $(".main-nav");

var link = $(".form__btn"),
    popup = $(".form__pop-up"),
    popup_off = $(".pop-up__btn"),
    overlay = $(".overlay");

var sliders = $(".price__wrapper");
var htmlSlider = sliders.html();
var sliderOn = false;
var sliderClass = sliders.attr("class");


//СЛАЙДЕР//
$(window).on('load resize', price_slider);

$(document).ready(function () {
    init();
    svg4everybody();
});


toggle.click(function () {
    if (list.hasClass("main-nav__list--open")) {
        list.removeClass("main-nav__list--open");
        active.removeClass("main-nav__active--open");
        toggle.removeClass("main-nav__toggle--active");
        nav.removeClass("main-nav--open");
        toggle.addClass("main-nav__toggle");
    }
    else {
        list.addClass("main-nav__list--open");
        active.addClass("main-nav__active--open");
        toggle.addClass("main-nav__toggle--active");
        nav.addClass("main-nav--open");
        toggle.removeClass("main-nav__toggle");
    }
    return false;
});

popup_off.click(function (event) {
    event.preventDefault();
    if (popup.hasClass("form__pop-up--open")) {
        popup.removeClass("form__pop-up--open");
        overlay.removeClass("overlay--open");
    }
});
link.click(function (event) {
    popup.addClass("form__pop-up--open");
    overlay.addClass("overlay--open");
    event.preventDefault();
});

function price_slider() {
    if ($(document).width() < 700) {
        if (sliderOn) {
            return
        }
        sliderOn = true;
        sliders.children(":first-child").remove();
        try {
            $('.price__slider').slick({
                autoplay: true,
                autoplaySpeed: 10000,
                draggable: false,
                infinite: true,
                dots: true,
                prevArrow: false,
                nextArrow: false,
                initialSlide: 1
            });
        }
        catch (e) {

        }
    }
    else {
        if (!sliderOn) {
            return
        }
        sliders.html(htmlSlider);
        sliders.attr("class", sliderClass);
        sliderOn = false;
    }
}

function init() {
    try {
        $('.sliders').slick({
            autoplay: true,
            autoplaySpeed: 10000,
            draggable: false,
            infinite: true,
            dots: true,
            prevArrow: '<div class="prev"></div>',
            nextArrow: '<div class="next"></div>'
        });
    }
    catch (e) {

    }
    //ПОЛЗУНОК//
    try {
        $(".slider").slider();
    }
    catch (e) {

    }
}













