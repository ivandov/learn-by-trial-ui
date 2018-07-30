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
