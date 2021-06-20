import { PublicNode } from '../public-node';
import { of } from 'rxjs';

export class PublicNodeMock implements PublicNode {
  static provider = {
    provide: Pu