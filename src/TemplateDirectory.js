/**
 * The idea of the templates, is that you provide a function
 * that returns a renderable array
 *
 * The use of the "spread syntax" (...) is cruicial for easy to read templates.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 */
export default class TemplateDirectory {
  constructor() {
    this.templates = new Map()
    this.defaultTemplates.forEach(this.add, this)
  }

  add(template) {
    this.templates.set(template.name, template.data)
  }

  get(name, props) {
    const template = this.templates.get(name)
    return template(props)
  }

  /**
   * TEMPLATES:
   * --------------------
   *  - timeline            | The calendar view for week and day
   *  - timelineHeader      | The fixed header showing dates
   *  - timelineDayHeader   | The individual header elements for each day
   *  - timelineList        | The list of times down the side
   *  - timelineMatrix      | The event container
   *  - timelineBackground  | The background of the event container
   */
  get defaultTemplates() {
    return [
      {
        "name": "timeline",
        "data": (props) => {
          let header = this.get('timelineHeader', props)
          let timeline = this.get('timelineList', props)
          let matrix = this.get('timelineMatrix', props)
          let marker = ['']

          //console.log('matrix', matrix)

          let template = [
            ['div', {class: 'tpc-content-header'}, ...header],
            ['div', {class: 'tpc-content__scroll'},
              ['div', {class: 'tpc-content-area'}, 
                ['div', {class: 'tpc-content__timeline'}, ...timeline],
                ['div', {class: 'tpc-content-area'}, ''],
                ['div', {class: 'tpc-content__matrix', 'data-controller': 'tpc-matrix'}, ...matrix],
                ['div', {class: 'tpc-current-marker'}, ...marker],
              ]
            ]
          ]
          //console.log('week template', week)

          return template
        }
      },
      {
        "name": "timelineHeader",
        "data": (props) => {
          let totalDays = props.totalDays
          let headers = []

          for (let i = 0; i < totalDays; i++) {
            headers.push(
              this.get('timelineDayHeader', {index: i})
            )
          }

          let template = [
            ['div', {class: ''}, ''],
            ['div', {class: 'tpc-content-header-container'}, ...headers],
          ]

          return template
        }
      },
      {
        "name": "timelineDayHeader",
        "data": ({index}) => {
          let classes = ['heading'].join(';')
          let styles = [''].join(';')
          return ['div', {class: classes, style: styles}, index]
        }
      },
      {
        "name": "timelineList",
        "data": (props) => {
          let { times } = props
          let template = times.map((time) => {
            let hour = time.match('0?([0-9]|1[0-9]|2[0-3]):')
            hour ? hour : hour = ''
            return ['div', {class: `time time-hour-${hour[1]}`}, [
              'div', {class: 'time-label'}, time
            ]]
          })

          //console.log('timeline', template)

          return template
        }
      },
      {
        "name": "timelineMatrix",
        "data": (props) => {
          let events = ['']
          let background = this.get('timelineBackground', props)

          let template = [
            ['div', {class: 'tpc-matrix__events'}, ...events],
            ['div', {class: 'tpc-matrix__background'}, ...background]
          ]

          //console.log('week matrix', background)
          //console.log('week matrix', template)

          return template
        }
      },
      {
        "name": "timelineBackground",
        "data": (props) => {

          let template = [
            ['div', {class: 'tpc-matrix__lines-vertical'},
              ...(totalDays => {
                let columns = []
                for (let i = 0; i < totalDays; i++) {
                  columns.push(
                    ['div', {class: 'tpc-matrix__lines-column'}, ''],
                  )
                }
                return columns
              })(props.totalDays)
            ],
            ['div', {class: 'tpc-matrix__lines-horizontal'}, 
              ...(props => {
                let lines = []
                for (let hour = 1; hour < 24; hour++) {
                  lines.push(
                    ['div',
                      {class: 'line', style: matrixHeightStyleAt(hour)},
                    '']
                  )
                }
                return lines
              }).bind(this)(props)
            ]
          ]
          //console.log('week background', template)

          return template
        }
      },
    ]
  }
}

const MINUTES_IN_A_DAY = 1440 // 24 * 60

function matrixHeightStyleAt(hours, minutes=0) {
  let minutesOnMatrix = MINUTES_IN_A_DAY
  let currentMinute = (hours * 60) + minutes
  let decimal = currentMinute / minutesOnMatrix
  let percentage = decimal * 100
  let styles = [`top: calc(${percentage}%)`].join(';')
  return styles
}
