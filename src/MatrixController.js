import { Controller } from "@hotwired/stimulus"

export default class MatrixController extends Controller {
  connect() {
    console.log(
      this.eventMatrix
    )
  }

  get calendar() {
    let element = this.element.closest(
      '[data-controller~=tpc-calendar]'
    )
    return element.controller
  }

  get eventMatrix() {
    return this.calendar.eventMatrix
  }
}
