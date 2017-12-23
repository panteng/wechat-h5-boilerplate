import TplIndex from './assets/templates/index.html'
import './assets/scss/index.scss'

export default ($box, data) => {
  let template = _.template(TplIndex)
  let _html = template()
  let $comp = $(_html)
  $box.append($comp)
  console.log($comp)
  console.log(data.test)
  console.log(window.commonData.test)
}

