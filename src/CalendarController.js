import { Controller } from "@hotwired/stimulus"
import TemplateDirectory from './TemplateDirectory.js'
import RenderingEngine from './RenderingEngine.js'
import EventMatrix from './EventMatrix.js'
import EventMatrixGroup from './EventMatrixGroup.js'
import MonthRange from './MonthRange.js'
import WeekRange from './WeekRange.js'
import { MONDAY, groupBy, testEventData } from 'helpers'
import { dateToString } from './helpers/functions.js'

const DEBUG = true

// I'm sure there's a way to generate this dynamically
// but I just couldn't be arsed at the time.
const TIMELINE = [
       '', '01:00', '02:00',
  '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00',
  '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00',
  '21:00', '22:00', '23:00',
]

const renderingEngine = new RenderingEngine(new TemplateDirectory())

/**
 * TODO
 * -------------------
 * - [ ] Implement a callback to set the padding on the header based
 *       on scrollbar width of the content.
 * - [ ] Make more responsive on mobile.
 * - [ ] Expand events that span multiple days or allow the server to do that
 */
export default class CalendarController extends Controller {
  static values = {
    startDate: {type: String, default: (new Date()).toJSON() },
    dateRange: {type: String, default: 'week'},
    viewType:  {type: String, default: 'timeline'}
  }
  static targets = ['timeline', 'view', 'matrix']

  connect() {
    // Attach the controller to the element so we can access
    // from the EventMatrix from the MatrixController.
    this.element.controller = this
    this.renderingEngine = renderingEngine

    // this.viewTypeValueChanged will run on it's own
  }

  get startDate() {
    return new Date(this.startDateValue)
  }

  viewTypeValueChanged(e) {
    this.generateDateSeries()
    this.renderView()
  }

  generateDateSeries() {
    let startDate = this.startDate
    let series
    if (this.dateRangeValue === 'week') {
      series = new WeekRange(startDate, MONDAY)
    } else if (this.dateRangeValue === 'month') {
      series = new MonthRange(startDate, MONDAY)
    } else {
      throw `unsupported range type: ${this.dateRangeValue}`
    }
    this.dateSeries = series
  }

  async generateEventMap() {
    // Date equality trick
    // https://stackoverflow.com/a/18743233

    let rawEvents = await this.fetchEventData()
    this.events = rawEvents.data
    // We don't need to sort the events if we use a Map()
    //this.events = sortEvents(rawEvents.data)

    let dates = this.dateSeries.days
    let eventMap = new Map()
    dates.forEach((date) => {
      eventMap.set(dateToString(date), [])
    })

    this.events.forEach((event) => {
      let array = []
      if (eventMap.has(event.date)) {
        array = eventMap.get(event.date)
      }
      array.push(event)
      eventMap.set(event.date, array)
    })
    //console.log(eventMap)

    return eventMap
  }

  async generateMatrix() {
    this.eventMap = await this.generateEventMap()
    this.eventMatrix = new EventMatrixGroup(this.eventMap)
    return this.eventMatrix
  }


  renderView() {
    let view = renderingEngine.renderTemplate(
      this.viewTypeValue,
      this.viewProps
    )
    this.viewTarget.replaceChildren(view)

    // Other options:
    //this.viewTarget.prepend(view)
    //this.viewTarget.appendChild(view)
  }

  get viewProps() {
    let days = this.dateSeries.days
    return {
      times: TIMELINE,
      dateSeries: days,
      totalDays: days.length,
    }
  }

  async fetchEventData() {
    let data
    if (DEBUG === true) {
      let today = new Date()
      data = testEventData(today)
    } else {
      data = { data: [] }
    }
    return data
  }
}

// Sort by start date
// https://stackoverflow.com/a/41034747
function sortEvents(events) {
  return events.sort((a, b) => {
    return a.start.localeCompare(b.start)
    //if (a.start < b.start) {
    //  return -1
    //} else if (a.start > b.start) {
    //  return 1
    //}
    //return 0
  })
}
