import { Controller } from "@hotwired/stimulus"
import TemplateDirectory from './TemplateDirectory.js'
import RenderingEngine from './RenderingEngine.js'
import EventMatrix from './EventMatrix.js'
import { groupBy, testEventData } from 'helpers'

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

export default class CalendarController extends Controller {
  static values = {
    startDate: String,
    viewType:  {type: String, default: 'timeline'}
  }
  static targets = ['timeline', 'view']

  connect() {
    this.events = this.eventData.data
    this.sortEvents()
    this.eventsByDate = groupBy(this.events, 'date')

    // render view
    let viewData = {
      times: TIMELINE,
      totalDays: 7,
    }
    let view = renderingEngine.renderTemplate(this.viewTypeValue, viewData)
    this.viewTarget.replaceWith(view)
    //this.viewTarget.prepend(view)
    //this.viewTarget.appendChild(view)
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
    let today = new Date()
    return testEventData(today)
  }
}
