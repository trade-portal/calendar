import { matrixHeightPercentage, MINUTES_IN_A_DAY } from 'helpers'

const TOTAL_SEGMENTS = 48 // 24 hours * 2 (30 minute intervals)

/**
 * The problem we're solving here is arranging overlapping events in a column
 * We want to create a data structure to represent the column and the events,
 * one that can be easily arranged, and the events expanded or shrunk as required.
 *
 * Ideally we should start with a single row, and only increase the rows if an event
 * overlaps. We should always try to make the next event fill the available space.
 *
 * We also want to keep all overlapping events proportional.
 *
 * Lets look at an example.
 *
 * 0. [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
 *
 * 1. [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0]
 * 
 * 2. [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0]
 *    [0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0]
 *
 * 3. [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0]
 *    [0,0,2,2,2,2,0,0,0,3,3,3,3,3,0,0,0]
 *
 * 4. [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0]
 *    [0,0,2,2,2,2,0,0,0,3,3,3,3,3,0,0,0]  Notice how number 2 has expanded.
 *    [0,0,2,2,2,2,0,0,0,0,4,4,4,4,4,0,0]
 *
 * 5. [1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5]
 *    [0,0,2,2,2,2,0,0,0,3,3,3,3,3,5,5,5]  And how number 5 has taken the available
 *    [0,0,2,2,2,2,0,0,0,0,4,4,4,4,4,0,0]  space.
 *
 * 6. [1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5]
 *    [0,0,2,2,2,2,0,0,0,3,3,3,3,3,6,6,6]  But what if number 6 needs to squeeze in?
 *    [0,0,2,2,2,2,0,0,0,0,4,4,4,4,4,0,0] 
 *
 * 7. [1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5]
 *    [0,0,2,2,2,2,0,0,0,3,3,3,3,3,6,6,6]  Now what if the rows increase to 4?
 *    [0,0,2,2,2,2,0,0,0,0,4,4,4,4,4,0,0]  The last column has 3 events but 4
 *    [0,0,2,2,2,2,0,0,0,0,0,0,0,0,7,7,7]  rows.
 *
 * I don't think we need to make it too complicated. I think the general rule
 * should be: 
 *   1. When finding a place to put an event, you should shrink existing if you can.
 *   2. If you need to a new row, expand/grow only the last row.
 *
 * However, when writing the above, I suddenly realised that it doesn't make sense
 * to do these optimisations as we go. We should simply append events, forgetting
 * about the expansion of them.
 *
 * To be honest, we're just going to make it work and refine the algorithm later.
 *
 * TODO: fucking finish it, mate.
 *
 */
export default class EventMatrix {
  constructor(date, events, {offset, size}) {
    this.date = date
    this.matrix = [this.blankRow]
    this.offset = offset
    this.size = size

    this.events = events.map(((event) => {
      return this.generateEventStruct(event)
    }).bind(this))
  }

  blankRow() {
    return new Array(TOTAL_SEGMENTS).fill(0)
  }

  columnWidth() {
    let percentage = (100.0 / this.size)
    return percentage
  }

  columnStart() {
    let percentage = (this.columnWidth() * this.offset)
    return percentage
  }

  columnEnd() {
    if (this.offset + 1 >= this.size) {
      return 0
    } else {
      let percentage = (this.columnStart() + this.columnWidth())
      return percentage
    }
  }

  generateEventStruct(eventData) {
    let start = new Date(eventData.start)
    let end = new Date(eventData.finish)

    let top = matrixHeightPercentage(start.getHours(), start.getMinutes())
    let bottom = matrixBottomPercentage(end.getHours(), end.getMinutes())

    let left = this.columnStart()
    let right = this.columnEnd()

    return {
      event: eventData,
      matrixData: {
        top:    top,
        bottom: bottom,
        left:   left,
        right:  right,
      }
    }
  }
}

function matrixBottomPercentage(hours, minutes=0) {
  return (100 - matrixHeightPercentage(hours, minutes))
}

