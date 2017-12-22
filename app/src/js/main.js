import 'babel-polyfill'
import Swiper from 'swiper'
import animationControl from './animation-control.js'
import TplLoading from '../templates/loading.html'
import TplAudioLoop from '../templates/audio-loop.html'
import TplSlide from '../templates/slide.html'
import 'normalize.css/normalize.css'
import 'swiper/dist/css/swiper.css'
import 'animate.css/animate.css'
import '../scss/main.scss'

$(document).ready(function () {

  let $body = $('body')

  let template = _.template(TplLoading)
  let _html = template()
  $body.prepend(_html)

  template = _.template(TplAudioLoop)
  _html = template()
  $body.append(_html)

  template = _.template(TplSlide)
  _html = template()
  $body.find('.swiper-wrapper').append(_html)

  let bgMusic = $('audio').get(0)
  let $btnMusic = $('.btn-music')
  let $upArrow = $('.up-arrow')

  // background music control
  $btnMusic.click(function () {
    if (bgMusic.paused) {
      bgMusic.play()
      $(this).removeClass('paused')
    } else {
      bgMusic.pause()
      $(this).addClass('paused')
    }
  })

  // init Swiper
  new Swiper('.swiper-container', {
    mousewheelControl: true,
    effect: 'coverflow',    // slide, fade, coverflow or flip
    speed: 400,
    direction: 'vertical',
    fade: {
      crossFade: false
    },
    coverflow: {
      rotate: 100,
      stretch: 0,
      depth: 300,
      modifier: 1,
      slideShadows: false     // do disable shadows for better performance
    },
    flip: {
      limitRotation: true,
      slideShadows: false     // do disable shadows for better performance
    },
    onInit: function (swiper) {
      animationControl.initAnimationItems()  // get items ready for animations
      animationControl.playAnimation(swiper) // play animations of the first slide
    },
    onTransitionStart: function (swiper) {     // on the last slide, hide .btn-swipe
      if (swiper.activeIndex === swiper.slides.length - 1) {
        $upArrow.hide()
      } else {
        $upArrow.show()
      }
    },
    onTransitionEnd: function (swiper) {       // play animations of the current slide
      animationControl.playAnimation(swiper)
    },
    onTouchStart: function (swiper, event) {    // mobile devices don't allow audios to play automatically, it has to be triggered by a user event(click / touch).
      if (!$btnMusic.hasClass('paused') && bgMusic.paused) {
        bgMusic.play()
      }
    }
  })

  // hide loading animation since everything is ready
  $('.loading-overlay').slideUp()
})
