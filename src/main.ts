import * as env from '../config/env'

let envDom = document.createElement('div')
for (let key in env) {
  let p = document.createElement('p')
  p.innerText = `${key} = ${env[key]}`
  envDom.appendChild(p)
}
document.querySelector('#app').appendChild(envDom)
