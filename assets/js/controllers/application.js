import { Application } from "@hotwired/stimulus"

const application = Application.start()

import { CalendarController, MatrixController } from 'tpc-calendar'
application.register('tpc-calendar', CalendarController)
application.register('tpc-matrix', MatrixController)

// Configure Stimulus development experience
application.debug = true
window.Stimulus   = application

export { application }
