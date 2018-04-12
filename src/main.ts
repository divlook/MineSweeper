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
  cnt: 10,
  col: 8,
  row: 8,
})
console.table(game.MAP)

app.appendChild(gameDom)
