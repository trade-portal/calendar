import { Application } from "@hotwired/stimulus"

const application = Application.start()

import { CalendarController } from 'tp-calendar'
application.register('tp-calendar', CalendarController)

// Configure Stimulus development experience
application.debug = true
window.Stimulus   = application

export { application }
