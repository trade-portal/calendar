import {
  AT_1AM, AT_2AM, AT_3AM, AT_4AM,  AT_5AM,  AT_6AM,
  AT_7AM, AT_8AM, AT_9AM, AT_10AM, AT_11AM, AT_MIDDAY,
} from './constants.js'

import { dateToString } from './functions.js'

export default function testEventData(date) {
  let year  = date.getFullYear()
  let month = date.getMonth()
  let day   = date.getDate()

  let times = [
    {from: AT_1AM,  until: AT_4AM},
    {from: AT_2AM,  until: AT_3AM},
    {from: AT_2AM,  until: AT_8AM},
    {from: AT_5AM,  until: AT_6AM},
    {from: AT_6AM,  until: AT_10AM},
    {from: AT_11AM, until: AT_MIDDAY},
  ]

  let data = times.map(function({from, until}) {
    return {
      start:  (new Date(year, month, day, from)).toJSON(),
      finish: (new Date(year, month, day, until)).toJSON(),
      date:   dateToString(new Date(year, month, day))
    }
  })

  return {data: data}
}
