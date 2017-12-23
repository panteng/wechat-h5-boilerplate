import 'babel-polyfill'
import Swiper from 'swiper'
import AnimationControl from './assets/js/animation-control.js'
import TplLoading from './assets/templates/loading.html'
import TplAudioLoop from './assets/templates/audio-loop.html'
import 'normalize.css/normalize.css'
import 'swiper/dist/css/swiper.css'
import 'animate.css/animate.css'
import './assets/scss/index.scss'

$(document).ready(function () {

  window.commonData = {test: 'test'}

  let $body = $('body')

  let template = _.template(TplLoading)
  let _html = template()
  let $loading = $(_html)
  $body.prepend($loading)

  // hide loading animation since everything is ready
  $loading.slideUp()

  template = _.template(TplAudioLoop)
  _html = template()
  let $bgMusic = $(_html)
  let bgMusic = $bgMusic.get(0)
  $body.append($bgMusic)

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

  let $swiperWrapper = $body.find('.swiper-wrapper')

  const slideLen = 3
  for (let i = 1; i <= slideLen; i++) {
    import(`./components/slide-${i}`).then(module => {
      module.default($swiperWrapper, window.commonData)
      if (i === slideLen) {
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
            AnimationControl.initAnimationItems()  // get items ready for animations
            AnimationControl.playAnimation(swiper) // play animations of the first slide
          },
          onTransitionStart: function (swiper) {     // on the last slide, hide .btn-swipe
            if (swiper.activeIndex === swiper.slides.length - 1) {
              $upArrow.hide()
            } else {
              $upArrow.show()
            }
          },
          onTransitionEnd: function (swiper) {       // play animations of the current slide
            AnimationControl.playAnimation(swiper)
          },
          onTouchStart: function (swiper, event) {    // mobile devices don't allow audios to play automatically, it has to be triggered by a user event(click / touch).
            if (!$btnMusic.hasClass('paused') && bgMusic.paused) {
              bgMusic.play()
            }
          }
        })
      }
    })
  }

})
