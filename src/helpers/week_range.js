import {
  MONDAY,
  FIRST,
  LAST,
  weekdaysStartingWith,
  dateSeries,
} from './date_constants.js'

/**
 * The problem we're solving here is that given a date, we want to generate
 * an entire week of dates that is offset depending on the specified starting
 * week day
 */
export default class WeekRange {
  constructor(date, weekStart = MONDAY) {
    this.initialDate = date
    this.initialDateDay = date.getDay() // day of the week

    this.weekdays  = weekdaysStartingWith(weekStart)
    this.weekStartDay = this.weekdays.at(FIRST)
    this.weekEndDay   = this.weekdays.at(LAST)
    this.initialDatePosition = this.weekdays.indexOf(this.initialDateDay)
  }

  get days() {
    if (!this.dateSeries) {
      this.dateSeries = dateSeries(this.weekStartDate, this.weekEndDate)
    }
    return this.dateSeries
  }

  get weekStartDate() {
    if (this.initialDateDay == this.weekStartDay) {
      return new Date(this.initialDate)
    } else {
      let startDate = new Date(this.initialDate)
      startDate.setDate(this.initialDate.getDate() - this.extraStartDays)
      return startDate
    }
  }

  get weekEndDate() {
    if (this.initialDateDay == this.weekEndDay) {
      return new Date(this.initialDate)
    } else {
      let endDate = new Date(this.initialDate)
      endDate.setDate(this.initialDate.getDate() + this.extraEndDays)
      return endDate
    }
  }

  get extraStartDays() {
    return this.weekdays.indexOf(this.initialDateDay)
  }

  get extraEndDays() {
    return this.weekdays.length - this.weekdays.indexOf(this.initialDateDay)
  }

}
