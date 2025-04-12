import 'controllers'
import {
  DateRangeGrid,
  OCTOBER,
  MONDAY
} from 'helpers'

const year = 2025
const month = OCTOBER
window.start = new Date(year, month, 1)
window.end   = new Date(year, month, 30)

console.log('start + end')
console.log(start)
console.log(end)

window.grid = new RangeGrid(start, end, MONDAY)
console.log(grid.days)
console.log('^ grid.days')
