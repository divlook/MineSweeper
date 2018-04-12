export interface ActionType {
  result?: string
}

export class MineSweeper {
  MAP_ROW: number
  MAP_COL: number
  MINE_CNT: number
  MINE: number
  SAFE: number
  MAP: any
  constructor({
    row = 10,
    col = 10,
    cnt = 7,
  }: {
    row?: number
    col?: number
    cnt?: number
  } = {}) {
    this.MAP_ROW = row
    this.MAP_COL = col
    this.MINE_CNT = cnt
    this.MINE = 1
    this.SAFE = 0
    this.MAP = this.generateMap()
    this.setMine(cnt)
  }
  set = value => value
  generateMap = () => {
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
  resetMap = () => {
    this.MAP = this.MAP.map(row => row.map(col => this.SAFE))
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
  mineSearch = (x, y) => {
    if (this.mineCheck(x, y)) return 'BOOM'

    let pattern = [-1, 0, 1]
    let boom = pattern.reduce((boom, row) => {
      boom = pattern.reduce((boom, col) => {
        if (row === 0 && col === 0) return boom
        else if (this.mineCheck(x - col, y -row)) boom++
        return boom
      }, boom)
      return boom
    }, 0)

    return boom
  }
}
