export type ActionType = string | number
export type MapType = (string | number)[][]

export class MineSweeper {
  el: HTMLElement
  MAP_ROW: number
  MAP_COL: number
  MINE_CNT: number
  MINE: number
  SAFE: number
  MAP: MapType
  constructor({
    el,
    row = 10,
    col = 10,
    cnt = 7,
  }: {
    el: HTMLElement
    row?: number
    col?: number
    cnt?: number
  }) {
    this.el = el
    this.MAP_ROW = row
    this.MAP_COL = col
    this.MINE_CNT = cnt
    this.MINE = 1
    this.SAFE = 0
    this.MAP = this.generateMap()
    this.setMine(cnt)
    this.el.classList.remove('mine-sweeper')
    this.el.classList.add('mine-sweeper')
    this.render()
  }
  generateMap = (): MapType => {
    let MAP = []
    for (let row = 0; row < this.MAP_ROW; row++) {
      let MAP_ROW = []
      for (let col = 0; col < this.MAP_COL; col++) {
        MAP_ROW.push(this.SAFE)
      }
      MAP.push(MAP_ROW)
    }
    return MAP
  }
  resetGame = () => {
    this.MAP = this.MAP.map(row => row.map(col => this.SAFE))
    this.setMine(this.MINE_CNT)
    this.el.removeChild(document.querySelector('.game-area'))
    this.render()
  }
  setMine = (cnt: number) => {
    let random = max => Math.floor(Math.random() * 100) % max
    for (; cnt > 0; cnt--) {
      let x = random(this.MAP_COL)
      let y = random(this.MAP_ROW)
      if (this.mineCheck(x, y)) continue
      this.MAP[y][x] = this.MINE
    }
  }
  mineCheck = (x, y) => {
    if (x < 0 || y < 0 || x >= this.MAP_COL || y >= this.MAP_ROW) return false
    return this.MAP[y][x] === this.MINE
  }
  mineSearch = (x, y): ActionType => {
    if (this.mineCheck(x, y)) return 'BOOM'

    let pattern = [-1, 0, 1]
    let boom = pattern.reduce((boom, row) => {
      boom = pattern.reduce((boom, col) => {
        if (row === 0 && col === 0) return boom
        else if (this.mineCheck(x - col, y - row)) boom++
        return boom
      }, boom)
      return boom
    }, 0)

    return boom
  }
  render = () => {
    let THIS = this
    let wrap = document.createElement('div')
    wrap.className = 'game-area'
    this.MAP.map((row, rowIndex) => {
      let line = document.createElement('div')
      line.className = 'game-line'
      row.map((col, colIndex) => {
        let block = document.createElement('div')
        block.className = 'game-block'
        block.innerText = 'click'
        block.dataset['x'] = String(colIndex)
        block.dataset['y'] = String(rowIndex)
        block.dataset['gone'] = 'no'

        block.addEventListener('click', function() {
          if (block.dataset['gone'] === 'yes') return
          let action = THIS.mineSearch(
            this.dataset['x'],
            this.dataset['y']
          )
          block.classList.add('gone')
          console.log(action)
          block.dataset['gone'] = 'yes'
          block.innerText = String(action)
          if (action === 'BOOM') {
            if (confirm('BOOM!\n\nRegame?')) THIS.resetGame()
          }
        })
        line.appendChild(block)
      })
      wrap.appendChild(line)
    })
    this.el.appendChild(wrap)
  }
}
