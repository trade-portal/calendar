import { Controller } from "@hotwired/stimulus"
import { 
  TemplateDirectory,
  RenderingEngine,
  testEventData,
  groupBy,
  EventMatrix,
} from 'helpers'

// I'm sure there's a way to generate this dynamically
// but I just couldn't be arsed at the time.
const TIMELINE = [
  '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
  '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
]

const renderingEngine = new RenderingEngine(new TemplateDirectory())

export default class CalendarController extends Controller {
  static values = {
    startDate: String,
    viewType:  {type: String, default: 'week'}
  }
  static targets = ['timeline']

  connect() {
    this.events = this.eventData.data
    this.sortEvents()
    this.eventsByDate = groupBy(this.events, 'date')

    // render timeline
    let timelineData = {times: TIMELINE}
    let timeline = renderingEngine.renderTemplate('timeline', timelineData)
    this.timelineTarget.appendChild(timeline)

    // render view
    let viewData = {}
    let view = renderingEngine.renderTemplate(this.viewTypeValue, viewData)
    this.viewTarget.appendChild(view)
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
