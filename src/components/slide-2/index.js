import TplIndex from './assets/templates/index.html'
import './assets/scss/index.scss'

export default ($box, data) => {
  let compiled = _.template(TplIndex)
  let _html = compiled(data)
  let $comp = $(_html)
  console.log($comp)
  console.log(data.swiper)
  console.log(window.commonData.test)
  return $comp
}

