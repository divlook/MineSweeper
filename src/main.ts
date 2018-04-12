import { MineSweeper, ActionType } from './game'

const app = document.querySelector('#app')

// header
const header = document.createElement('header')
const title = document.createElement('h1')
title.innerText = 'Mine Sweeper'
header.appendChild(title)
app.appendChild(header)

// game
const gameDom = document.createElement('div')
const game = new MineSweeper({
  el: gameDom,
  cnt: 8,
  col: 6,
  row: 6,
})
app.appendChild(gameDom)
console.table(game.MAP)

// button
const btnDom = document.createElement('div')
btnDom.className = 'btn-area'
const btnReset = document.createElement('button')
btnReset.innerText = 'New Game'
btnReset.addEventListener('click', () => game.resetGame())
btnDom.appendChild(btnReset)
const btnChange = document.createElement('button')
btnChange.innerText = 'Map Change'
btnChange.addEventListener('click', () => {
  game.inputParam()
  game.resetGame()
})
btnDom.appendChild(btnChange)
header.appendChild(btnDom)
