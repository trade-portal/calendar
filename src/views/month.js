import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect(events) {
    this.events = events 
  }  

  render() {
    return "moth" 
  }
}

