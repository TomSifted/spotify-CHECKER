import { Observable } from "rxjs";

/**
 * Trim, remove extranumerary spaces and lowercase the seed
 *
 * rxjs pipe
 */
export function trimSeed() {
  return function (source: Observable<any>): Observable<any> {
    return new Observable(subscriber => {
      source.subscribe({
        next(value) {
          value.seed = value.seed.trim();
          if (v