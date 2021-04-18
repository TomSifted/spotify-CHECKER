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

  decode(hash: string, encoding: string) {
    let hashBytes;
    switch (encoding) {
      case 'base64':
        hashBytes = this.base64Decode(hash);
        break;

      case 'base58':
        hashBytes = this.base58Decode(hash);
        break;

      case 'hex':
        hashBytes = this.hexDecode(hash);
        break;
    }

    if (!hashBytes) {
      throw 'Uncnown encoding: ' + encoding;
    }

    return hashBytes;
  }

  validateSHA256(hash: string, encoding: string) {
    const hashBytes = this.decode(hash, encoding);
    return hashBytes.length === 32;
  }

  base64Decode(hash: string) {
    const bytes = Buffer.from(hash, 'base64').toString('binary');
    return new Uint8Array(bytes.spl