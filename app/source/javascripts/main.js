window.onload = function () {
    // 加载依赖
    var $ = jQuery = require('jquery');
    var Swiper = require('swiper');
    var animationControl = require('./animation-control.js');

    // 获取背景音乐DOM
    var bgMusic = $('audio').get(0);
    // 获取背景音乐开关控制按钮
    var $btnMusic = $('.btn-music');

    // 获取.btn-swipe
    var $btnSwipe = $('.btn-swipe');

    // 背景音乐控制按钮
    $('.btn-music').click(function () {
        if (bgMusic.paused) {
            bgMusic.play();
            $(this).removeClass('paused');
        } else {
            bgMusic.pause();
            $(this).addClass('paused');
        }
    });

    // 初始化Swiper实例
    new Swiper('.swiper-container', {
        direction: 'vertical',
        onInit: function (swiper) {
            animationControl.initAnimationItems();  // 初始化动画元素
            animationControl.execAnimation(swiper); // 执行第一个slide的动画
        },
        onSlideChangeStart: function (swiper) {     // 当滑动到最后一个slide时，隐藏.btn-swipe
            if (swiper.activeIndex === swiper.slides.length - 1) {
                $btnSwipe.hide();
            } else {
                $btnSwipe.show();
            }
        },
        onSlideChangeEnd: function (swiper) {       // 执行当前slide的动画
            animationControl.execAnimation(swiper);
        },
        onTouchStart: function (swiper, event) {    // 由于移动端浏览器不支持audio的自动播放，因此背景音乐的播放需要由用户点击屏幕后触发
            if (!$btnMusic.hasClass('paused') && bgMusic.paused) {
                bgMusic.play();
            }
        }
    });

    // 页面完成加载后，隐藏加载动画
    $('.loading-overlay').slideUp();
};
