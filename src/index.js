import { Controller } from "@hotwired/stimulus"
import CalEvent from "./cal_event.js"
import Month from "./views/month.js"

// Connects to data-controller="example"
export default class extends Controller {
  static values = { 
    events: Object,
    view: String
  }
  get viewObject() {
    switch (this.viewValue) {
      case "month":
        return new Month(this.eventObjects)
      case "week":
        return new Week(this.eventObjects)
      case "day":
        return new Day(this.eventObjects)
    }
  }

  connect() {
    this.events = []
    this.eventsValue = {
      "events": [
        {
          "start": "",
          "end": "",
          "title": "job",
          "description": "this is a job",
          "id": "53"
        }
      ]
    }
  }

  render() {
    const events = this.eventsValue
    this.renderCalendar()
    this.renderEvents()

  }
  eventsValueChanged() {
    this.events = this.eventObjects
    this.render()
  }
  renderCalendar() {
    this.renderControls()
    this.element.innerHTML = this.viewObject.render()
  }
  renderEvents() {
  }

  renderControls() {
  }

  get eventObjects() {
    const array = []
    console.log(this.eventsValue)
    if (!this.eventsValue.events) {
      return 
    }
    this.eventsValue.events.forEach(event_data => {
      const cal_event = new CalEvent(event_data)
      array.push(cal_event)
    })
    return array
  } 
}

