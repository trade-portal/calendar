import EventMatrix from './EventMatrix.js'

/**
 * The purpose if this class is to prevent the EventMatrix from having
 * too many jobs to do.
 * 
 * It's only responsibility is to decide how to layout the events it's given.
 * Dealing with groups of events is not it's concern.
 *
 * What we're able to do from inside this class, is specify an offset to
 * each EventMatrix.
 * 
 * This is how we are able to render different columns.
 */
export default class EventMatrixGroup {
  constructor(eventMap) {
    console.log('event matrix group construct', eventMap)
    this.matrices = new Map()
    //this.dateSeries = dateSeries

    // This where we give it each event matrix an offset
    // The event matrices can then just render themselves.
    let i = 0
    eventMap.forEach(((events, date, map) => {
      this.add(new EventMatrix(date, events, {offset: i, size: map.size}))
      i++
    }).bind(this))

    console.log(this.matrices)
  }

  add(matrix) {
    if (matrix instanceof EventMatrix) {
      this.matrices.set(matrix.date, matrix)
    } else {
      throw 'You can only add EventMatrix objects to EventMatrixGroups'
    }
  }
}
