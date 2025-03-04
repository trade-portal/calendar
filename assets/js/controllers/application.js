import { Application } from "@hotwired/stimulus"

const application = Application.start()

//import Flatpickr from 'stimulus-flatpickr'
//application.register('flatpickr', Flatpickr)

// Configure Stimulus development experience
application.debug = true
window.Stimulus   = application

export { application }