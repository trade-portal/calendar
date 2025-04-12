/**
 * Generate a series of dates between a start and end date
 * @param {Date|string} startDate - The start date
 * @param {Date|string} endDate - The end date
 * @param {string} interval - The interval between dates ('day', 'week', 'month', 'year')
 * @param {number} step - The number of intervals to step (default: 1)
 * @returns {Date[]} - Array of dates
 */
export function generateDateSeries(startDate, endDate, interval = 'day', step = 1) {
  // Convert string dates to Date objects
  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);

  // Validate dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date format');
  }

  if (start > end) {
    throw new Error('Start date must be before end date');
  }

  // Validate interval
  const validIntervals = ['day', 'week', 'month', 'year'];
  if (!validIntervals.includes(interval)) {
    throw new Error(`Invalid interval. Must be one of: ${validIntervals.join(', ')}`);
  }

  // Validate step
  if (step <= 0 || !Number.isInteger(step)) {
    throw new Error('Step must be a positive integer');
  }

  const dates = [];
  let currentDate = new Date(start);
  
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    
    switch (interval) {
      case 'day':
        currentDate.setDate(currentDate.getDate() + step);
        break;
      case 'week':
        currentDate.setDate(currentDate.getDate() + (step * 7));
        break;
      case 'month':
        currentDate.setMonth(currentDate.getMonth() + step);
        break;
      case 'year':
        currentDate.setFullYear(currentDate.getFullYear() + step);
        break;
    }
  }
  
  return dates;
}
