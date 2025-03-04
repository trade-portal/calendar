pin 'application', to: 'assets/js/application.js', preload: true
pin "@hotwired/stimulus", to: "https://ga.jspm.io/npm:@hotwired/stimulus@3.2.2/dist/stimulus.js", preload: true
pin "@hotwired/stimulus-loading", to: "assets/js/stimulus-loading.js", preload: true
pin_all_from "assets/js/controllers", under: "controllers", to: 'assets/js/controllers'