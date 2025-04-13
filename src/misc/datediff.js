// -----------------------------
// Thanks to:
// https://github.com/dmfilipenko/datediff/blob/master/src/datediff.js
// -----------------------------
export default function datediff(fromDate, toDate) {
  if (!fromDate) throw new Error('Date should be specified');
  var startDate = new Date(1970, 0, 1, 0).getTime(),
      now = new Date(),
      toDate = toDate && toDate instanceof Date ? toDate : now,
      diff = toDate - fromDate,
      date = new Date(startDate + diff),
      years = date.getFullYear() - 1970,
      months = date.getMonth(),
      days = date.getDate() - 1,
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds(),
      diffDate = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };

  if (years < 0) return diffDate;
  diffDate.years = years > 0 ? years : 0;
  diffDate.months = months > 0 ? months : 0;
  diffDate.days = days > 0 ? days : 0;
  diffDate.hours = hours > 0 ? hours : 0;
  diffDate.minutes = minutes > 0 ? minutes : 0;
  diffDate.seconds = seconds > 0 ? seconds : 0;
  return diffDate;
}

const JANUARY  = 0
const THE_FIRST = 1
const AT_MIDNIGHT = 0
const START_OF_ALL_TIME = new Date(
  1970,
  JANUARY, 
  THE_FIRST,
  AT_MIDNIGHT
).getTime() // returns milliseconds since UNIX epoch

/**
 * Native Javascript Date objects are just wrappers around UNIX
 * epoch time in milliseconds. Therefore to get the
 * milliseconds between two dates, all we have to do
 * is minus them.
 *
 * For example: 
 * -> date1 = new Date(2023, 10, 2)
 * -> date2 = new Date(2025, 2, 3)
 * -> date2 - date1
 * => 42076800000
 *
 * We can then add this onto the epoch and work out how
 * many years since it's been.
 *
 * Working out how many months is easy as Javascript 
 * represents January as 0 so as long as we choose January
 * 1st as our start point we just give that value
 *
 * Days is similar except Javascript represents the first
 * of the month as 1
 *
 * This isn't 100% accurate  for days as it doesn't take into
 * account leap years and months with varying lengths.
 *
 * But should be fine for date ranges less than a month or 
 * for calculating time differences.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 */
export default class DateDiff {
  constructor(startDate, endDate) {
    this.stateDate = startDate
    this.endDate = endDate
    this.difference = this.differenceAsDateObject
  }

  get differenceInMilliseconds() {
    return this.startDate - this.endDate
  }

  get differenceAsDateObject() {
    return new Date(
      START_OF_ALL_TIME + this.differenceInMilliseconds
    )
  }

  get years() {
    let startYear = START_OF_ALL_TIME.getFullYear()
    let endYear   = this.difference.getFullYear()
    return currentYear - startYear
  }

  get months() {
    return this.difference.getMonth()
  }

  get days() {
    return this.difference.getDate() - 1
  }

  get hours() {
    return this.difference.getHours()
  }

  get minutes() {
    return this.difference.getMinutes()
  }

  get seconds() {
    return this.difference.getSeconds()
  }
}
