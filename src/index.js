import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="example"
export default class extends Controller {
  connect() {
    console.log('Hello, from the controller!')
    alert('stimulus is working')
  }
}
