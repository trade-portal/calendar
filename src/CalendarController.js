import { Controller } from "@hotwired/stimulus"
import TemplateDirectory from './TemplateDirectory.js'
import RenderingEngine from './RenderingEngine.js'
import EventMatrix from './EventMatrix.js'
import MonthRange from './MonthRange.js'
import WeekRange from './WeekRange.js'
import { MONDAY, groupBy, testEventData } from 'helpers'

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
 */
export default class CalendarController extends Controller {
  static values = {
    startDate: {type: String, default: (new Date()).toJSON() },
    dateRange: {type: String, default: 'week'},
    viewType:  {type: String, default: 'timeline'}
  }
  static targets = ['timeline', 'view', 'matrix']

  connect() {
    // attach the controller to the element so we can access
    // from the matrix.
    this.element.controller = this

    this.events = this.eventData.data
    this.sortEvents()
    this.eventsByDate = groupBy(this.events, 'date')
    this.eventMatrix = new EventMatrix()
  }

  get startDate() {
    return new Date(this.startDateValue)
  }

  viewTypeValueChanged(e) {
    this.renderView()
  }

  renderView() {
    let view = renderingEngine.renderTemplate(
      this.viewTypeValue,
      this.viewProps
    )
    this.viewTarget.replaceWith(view)

    // Other options:
    //this.viewTarget.prepend(view)
    //this.viewTarget.appendChild(view)
  }

  get viewProps() {
    let dateSeries = this.generateDateSeries().days
    return {
      times: TIMELINE,
      dateSeries: dateSeries,
      totalDays: dateSeries.length,
    }
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
    return series
  }

  // Sort by start date
  sortEvents() {
    this.events.sort((a, b) => {
      if (a.start < b.start) {
        return -1
      } else if (a.start > b.start) {
        return 1
      }
      return 0
    })
  }

  get eventData() {
    if (DEBUG === true) {
      let today = new Date()
      return testEventData(today)
    } else {
      return {}
    }
  }
}
