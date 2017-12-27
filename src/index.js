import 'babel-polyfill'
import Swiper from 'swiper'
import AnimationControl from './assets/js/animation-control.js'
import TplAudioLoop from './assets/templates/audio-loop.html'
import 'normalize.css/normalize.css'
import 'swiper/dist/css/swiper.css'
import 'animate.css/animate.css'
import './assets/scss/index.scss'

$(document).ready(function () {

  window.commonData = {test: 'test'}

  let $body = $('body'), compiled, _html

  compiled = _.template(TplAudioLoop)
  _html = compiled()
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
  // init Swiper
  let swiper = new Swiper('.swiper-container', {
    init: false,
    direction: 'vertical',
    speed: 400,
    on: {
      init () {
        AnimationControl.initAnimationItems()
        AnimationControl.playAnimation(this)
      },
      transitionEnd () {
        AnimationControl.playAnimation(this)
      },
      slideChange () {
        if (this.activeIndex === 1) {
          $upArrow.hide()
        } else {
          $upArrow.show()
        }
      }
    }
  })

  let $slides = []
  const slideLen = 2
  for (let i = 1; i <= slideLen; i++) {
    import(`./components/slide-${i}`).then(module => {
      let $slide = module.default($swiperWrapper, {swiper: swiper})
      $slide.data('index', i)
      $slides.push($slide)
      if ($slides.length === slideLen) {
        $slides.sort(function (a, b) {
          return a.data('index') - b.data('index')
        })
        $swiperWrapper.append($slides)
        swiper.init()
        $body.find('.loading-overlay').hide()
      }
    })
  }

})
