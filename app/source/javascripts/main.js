var $ = jQuery = require('jquery');
require('swiper');

window.onload = function () {
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical'
    });

    $('.loading-overlay').slideUp();

    $('.btn-music').click(function () {
        var bgMusic = $('audio').get(0);
        if (bgMusic.paused) {
            bgMusic.play();
        } else {
            bgMusic.pause();
        }
    });
};
