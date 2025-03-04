import { Application } from "@hotwired/stimulus"

const application = Application.start()

import Calendar from 'stimulus-calendar'
application.register('stimulus-calendar', Calendar)

// Configure Stimulus development experience
application.debug = true
window.Stimulus   = application

export { application }
