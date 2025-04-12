export function groupBy(array, key) {

  let initialValue = {}

  return array.reduce(function(group, item) {

    let groupKey = item[key]

    group[groupKey] = group[groupKey] || []
    group[groupKey].push(item)

    return group

  }, initialValue)
}
