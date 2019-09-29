export const times = <T>(repeats: number, callback: (index: number) => T) => {
  const arr = [] as T[];
  for (let i = 0; i < repeats; i += 1) {
    arr.push(callback(i));
  }

  return arr;
};
