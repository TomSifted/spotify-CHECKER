import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

@Injectable()
export class EncoderService {
  private alphabet: string;
  private alphabetMap: { [key: string]: number };

  constructor() {
    this.alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    this.alphabetMap = this.alphabet.split('').reduce(
      (map, c, i) => {
        map[c] = i;
        return map;
      },
      {} as any
    );
  }

  base64Encode(buffer: any) {
    return Buffer.from(String.fromCharCode.apply(null, buffer), 'binary').toString('base64');
  }

  hexEncode(buffer: any) {
    return Buffer.from(String.fromCharCode.apply(null, buffer), 'binary').toString('hex');
  }

  decode(has