const SUNDAY    = 0
const MONDAY    = 1
const TUESDAY   = 2
const WEDNESDAY = 3
const THURSDAY  = 4
const FRIDAY    = 5
const SATURDAY  = 6
const WEEKDAYS = [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY]

const JANUARY  = 0
const THE_FIRST = 1
const ONE_DAY = 1

// Used for arrays
const FIRST = 0
const LAST = -1

/**
 * The problem we're solving here is that we need to calculate the empty
 * spaces before or after a week or month.
 *
 * Then we need to be able to extract each week and iterate through the days.
 * So we need to create a grid of days.
 *
 * The grid can be visualised as such:
 *
 * [
 *   [29, 30, 31, 01, 02, 03, 04],
 *   [05, 06, 07, 08, 09, 10, 11],
 *   [12, 13, 14, 15, 16, 17, 18],
 *   [19, 21, 22, 23, 24, 25, 26],
 *   [27, 28, 29, 30, 31, 01, 02]
 * ]
 *
 * Then we can iterate per week and then per day.
 */
export default class DateRangeGrid {
  constructor(startDate, endDate, weekStart = MONDAY) {
    this.startDate = startDate
    this.startDateDay = startDate.getDay()

    this.endDate = endDate
    this.endDateDay = endDate.getDay()

    this.weekdays  = weekdaysStartingWith(weekStart)

    this.weekStartDay = this.weekdays.at(FIRST)
    this.weekEndDay   = this.weekdays.at(LAST)
  }

  /**
   * Basically slice the array of all dates into chunks of 7.
   * @return {array}
   */
  get weeks() {
    if (!this.weekSeries) {
      let days = this.days
      let totalDays = this.days.length
      let weekLength = this.weekdays.length
      let weeks = []

      for (let chunkStart = 0; chunkStart < totalDays; chunkStart += weekLength) {
        let chunkEnd = chunkStart + weekLength
        let chunk = days.slice(chunkStart, chunkEnd)
        weeks.push(chunk)
      }
      this.weekSeries = weeks
    }

    return this.weekSeries
  }

  /**
   * Return all days including the extra ones that fill the grid.
   * @return {array}
   */
  get days() {
    if (!this.dateSeries) {
      this.dateSeries = dateSeries(this.gridStartDate, this.gridEndDate)
    }
    return this.dateSeries
  }

  get gridStartDate() {
    if (this.startsOnWeekStart()) {
      return this.startDate
    } else {
      let gridStartDate = new Date(this.startDate)
      gridStartDate.setDate(this.startDate.getDate() - this.extraStartDays)
      return gridStartDate
    }
  }

  get gridEndDate() {
    if (this.endsOnWeekEnd()) {
      return this.endDate
    } else {
      let gridEndDate = new Date(this.endDate)
      gridEndDate.setDate(this.endDate.getDate() + this.extraEndDays)
      return gridEndDate
    }
  }

  startsOnWeekStart() {
    return this.startDateDay == this.weekStartDay
  }

  endsOnWeekEnd() {
    return this.endDateDay == this.weekEndDay
  }

  get extraStartDays() {
    return this.weekdays.indexOf(this.startDateDay)
  }

  get extraEndDays() {
    return this.weekdays.length - this.weekdays.indexOf(this.endDateDay)
  }
}

function offsetArray(array, offset) {
  return [
    ...array.slice(offset),
    ...array.slice(FIRST, offset)
  ]
}

function weekdaysStartingWith(startDay) {
  return offsetArray(WEEKDAYS, startDay)
}

function startOfYear(date) {
  return new Date(date.getFullYear(), JANUARY, THE_FIRST)
}

function dateSeries(startDate, endDate) {
  let dates = []
  let currentDate = new Date(startDate)
  while (currentDate < endDate) {
    dates.push(currentDate)
    currentDate = new Date(currentDate)
    currentDate.setDate(currentDate.getDate() + ONE_DAY)
  }
  return dates
}
