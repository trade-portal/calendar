import { Controller } from "@hotwired/stimulus"

// We might want to rename this so I've moved the dependency
// here to make it a little more obvious.
const CALENDAR_CONTROLLER_NAME = 'tpc-calendar'

export default class MatrixController extends Controller {
  static targets = ['matrix']

  connect() {
    let self = this
    this.calendar.generateMatrix().then((matrix) => {
      self.eventMatrix = matrix
    }).then(this.renderView.bind(this))
  }

  renderView() {
    let fragment = this.calendar.renderingEngine.renderTemplate('eventMatrix', {
      matrix: this.eventMatrix
    })
    this.matrixTarget.replaceChildren(fragment)
  }

  get calendar() {
    let element = this.element.closest(
      `[data-controller~=${CALENDAR_CONTROLLER_NAME}]`
    )
    return element.controller
  }
}
