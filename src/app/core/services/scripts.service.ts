import { Observable } from 'rxjs';

export interface PredefinedScript {
  label: string;
  value: string;
}

/**
 * Smart scripts service interface.
 *
 * You can find implemetation in : ./scripts.service.impl.ts
 */
export abstract class ScriptsService 