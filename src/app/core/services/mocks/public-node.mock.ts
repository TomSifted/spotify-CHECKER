import { PublicNode } from '../public-node';
import { of } from 'rxjs';

export class PublicNodeMock implements PublicNode {
  static provider = {
    provide: PublicNode,
    useClass: PublicNodeMock
  };

  version() {
    return of('1.0.0');
  }

  height() {
    return of(777);
  }

  lastBlocks() {
    return of([]);
  }

  headerSequence() {
    return of([]);
  }

  transaction(id: string) {
    return of(null);
  }

  block() {
    return of(null);
  }

  transactionsOf() {
    return of([]);
  }

  indexedTransactions