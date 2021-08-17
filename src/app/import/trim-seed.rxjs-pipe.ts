import { Observable } from "rxjs";

/**
 * Trim, remove extranumerary spaces and lowercase the seed
 *
 * rxjs pipe
 */
export function trimSeed() {
  return function (source: Observable