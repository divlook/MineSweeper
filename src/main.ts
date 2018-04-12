import { MineSweeper, ActionType } from './game'

const app = document.querySelector('#app')

// header
const header = document.createElement('header')
const title = document.createElement('h1')
title.innerText = 'Mine Sweeper'
header.appendChild(title)
app.appendChild(header)

// game
const game = new MineSweeper({
  cnt: 10,
  col: 10,
  row: 30,
})
console.table(game.MAP)

const gameDom = document.createElement('div')
gameDom.className = 'game-area'
game.MAP.map((row, rowIndex) => {
  let line = document.createElement('div')
  line.className = 'game-line'
  row.map((col, colIndex) => {
    let block = document.createElement('div')
    block.className = 'game-block'
    block.innerText = 'click'
    block.dataset['x'] = colIndex
    block.dataset['y'] = rowIndex
    block.dataset['gone'] = 'no'
    block.addEventListener('click', (event: any) => {
      if (block.dataset['gone'] === 'yes') return
      let action = game.set(
        game.mineSearch(event.target.dataset['x'], event.target.dataset['y'])
      )
      block.classList.add('gone')
      console.log(action)
      block.dataset['gone'] = 'yes'
      block.innerText = action
      if (action === 'BOOM') alert(action)
    })
    line.appendChild(block)
  })
  gameDom.appendChild(line)
})
app.appendChild(gameDom)
