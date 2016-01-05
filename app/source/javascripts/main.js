// load dependencies
var $ = jQuery = require('jquery');
var Swiper = require('swiper');

window.onload = function () {
    require('move-js');
    // init Swiper instance
    new Swiper('.swiper-container', {
        direction: 'vertical',
        onSlideChangeStart: function (swiper) {     // hide .btn-swipe when reaching the last slide
            if (swiper.activeIndex === swiper.slides.length - 1) {
                $('.btn-swipe').hide();
            } else {
                $('.btn-swipe').show();
            }
        },
        onSlideChangeEnd: function (swiper) {
            console.log(swiper);
        }
    });

    // hide loading-overlay when page finishes loading
    $('.loading-overlay').slideUp();

    // background music control button
    $('.btn-music').click(function () {
        var bgMusic = $('audio').get(0);
        if (bgMusic.paused) {
            bgMusic.play();
        } else {
            bgMusic.pause();
        }
        $(this).toggleClass('paused');
    });
};
