export function groupBy(array, key) {

  let initialValue = {}

  return array.reduce(function(group, item) {

    let groupKey = item[key]

    group[groupKey] = group[groupKey] || []
    group[groupKey].push(item)

    return group

  }, initialValue)
}

export function dateToString(date) {
  let year  = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  return `${year}-${month}-${day}`
}


export const MINUTES_IN_A_DAY = 1440 // 24 * 60

export function matrixHeightPercentage(hours, minutes=0) {
  let minutesOnMatrix = MINUTES_IN_A_DAY
  let currentMinute = (hours * 60) + minutes
  let decimal = currentMinute / minutesOnMatrix
  let percentage = decimal * 100
  return percentage
}

export function matrixHeightStyleAt(hours, minutes=0) {
  let percentage = matrixHeightPercentage(hours, minutes)
  let styles = [`top: calc(${percentage}%)`].join(';')
  return styles
}

export function getInternationalDate(date) {
  let array = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).formatToParts(date)

  let object = array.reduce((obj, item) => {
    //console.log(item)
    let { type, value } = item
    //console.log(type, value)
    Object.assign(obj, {[type]: value})
    return obj
  }, {})

  return object
}
