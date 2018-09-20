// @ts-ignore
String.prototype.padStart = (targetLength: number, padString: string) => {
  targetLength = targetLength >> 0
  padString = String(typeof padString !== 'undefined' ? padString : ' ')

  if (this.length > targetLength) {
    return String(this)
  }

  targetLength = targetLength - this.length

  if (targetLength > padString.length) {
    padString += padString.repeat(targetLength / padString.length)
  }

  return padString.slice(0, targetLength) + String(this)
}
