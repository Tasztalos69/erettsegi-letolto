/**
 * Compute the available years.
 */
const maxYear =
  new Date().getFullYear() - Number(!(new Date().getMonth() >= 5));

const zeroed = Array.from({ length: maxYear - 2005 + 1 }).fill(0) as Array<0>;

export const YEARS: number[] = zeroed.map((x, i) => x + 2005 + i);
