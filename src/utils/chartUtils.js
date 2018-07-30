export function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export function getRandomColor () {
  let r = getRandomInt(0, 256)
  let g = getRandomInt(0, 256)
  let b = getRandomInt(0, 256)

  let borderCol = `rgb(${r}, ${g}, ${b})`
  let backgroundCol = `rgb(${r}, ${g}, ${b}, 0.2)`

  return {border: borderCol, background: backgroundCol}
}

export function calculateDuration (obj, returnType) {
  // console.log(obj)
  let returnVal

  let duration = new Date(obj.endDate) - new Date(obj.date)
  let seconds = Math.floor(duration / 1000)
  let minutes = Math.ceil(seconds / 60)

  if (returnType === 'seconds') {
    console.log(seconds)
    returnVal = seconds
  }
  else if (returnType === 'minutes') {
    returnVal = minutes
  }

  if (isNaN(returnVal)) return undefined
  return returnVal
}
