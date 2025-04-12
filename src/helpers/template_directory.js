/**
 * The idea of the templates, is that you provide a function
 * that returns a renderable array
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

  get defaultTemplates() {
    return [
      {
        "name": "timeline",
        "data": (props) => {
          let arrayData = props.times.map((time) => {
            return ['div', {class: 'time'}, time]
          })
          arrayData.unshift(this.get('header', {})[0])
          return arrayData
        }
      },
      {
        "name": "header",
        "data": (props) => {
          return [
            ['div', {class: 'header'}, '']
          ]
        }
      },
      {
        "name": "week",
        "data": (props) => {
          let arrayData = 
          return [
            ['div', {class: 'week'}, '']
          ]
        }
      },
      {
        "name": "day",
        "data": (props) => {
          return [
            ['div', {class: 'day'}, '']
          ]
        }
      },
    ]
  }
}
