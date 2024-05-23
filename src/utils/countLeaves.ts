import sum from "./sum";

/**
 * Recursively counts the number of leaves in an object
 * @param val the object
 * @returns the leaf count
 * @see https://stackoverflow.com/a/56373174/11398687
 */
const countLeaves = (val: Record<any, any>): number => {
  if (typeof val !== "object" || Array.isArray(val)) {
    return 1;
  }

  return Object.values(val).map(countLeaves).reduce(sum, 0);
};
