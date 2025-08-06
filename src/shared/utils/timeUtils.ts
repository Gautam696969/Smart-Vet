export function generateTimes() {
  const times = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour = h % 12 === 0 ? 12 : h % 12
      const ampm = h < 12 ? 'AM' : 'PM'
      const min = m.toString().padStart(2, '0')
      times.push(`${hour}:${min} ${ampm}`)
    }
  }
  return times
}