export const combineFilters = <T>(...filters: ((t: T) => boolean)[]) => (array: T[]) =>
  array.filter(item => filters.reduce((prev: boolean, filter) => prev || filter(item), false))
