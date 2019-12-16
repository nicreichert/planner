export const times = <T>(repeats: number, callback: (index: number) => T) =>
  [...Array(repeats).keys()].map(callback)
