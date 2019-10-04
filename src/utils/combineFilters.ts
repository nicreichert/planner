export const combineFilters = <T>(...filters: Array<(t: T) => boolean>) => (array: Array<T>) =>
  array.filter(item => filters.reduce((prev: boolean, filter) => prev || filter(item), false));
