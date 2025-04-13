import { Application } from "@hotwired/stimulus"

const application = Application.start()

import Calendar from 'tp-calendar'
application.register('tp-calendar', Calendar)

// Configure Stimulus development experience
application.debug = true
window.Stimulus   = application

export { application }
