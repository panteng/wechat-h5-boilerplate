window.onload = function () {
    // load dependencies
    var $ = jQuery = require('jquery');
    var Swiper = require('swiper');
    var move = require('move-js');
    var animationControl = require('./animation-control.js');

    // init Swiper instance
    new Swiper('.swiper-container', {
        direction: 'vertical',
        onInit: function (swiper) {
            animationControl.initAnimationItems();
            animationControl.execAnimation(swiper);
        },
        onSlideChangeStart: function (swiper) {     // hide .btn-swipe when reaching the last slide
            if (swiper.activeIndex === swiper.slides.length - 1) {
                $('.btn-swipe').hide();
            } else {
                $('.btn-swipe').show();
            }
        },
        onSlideChangeEnd: function (swiper) {
            animationControl.execAnimation(swiper);
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
