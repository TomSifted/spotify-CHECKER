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
    return new Uint8Array(bytes.split('').map(c => c.charCodeAt(0)));
  }

  base58Decode(hash: string) {
    if (!hash.length) return new Uint8Array(0);

    const bytes = [0];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < hash.length; i++) {
      const c = hash[i];
      if (!(c in this.alphabetMap)) {
        throw new Error(`hash-encoder: there is no character "${c}" in the base58 sequence`);
      }

      for (let j = 0; j < bytes.length; j++) {
        bytes[j] *= 58;
      }

      bytes[0] += this.alphabetMap[c];
      let carry = 0;

      for (let j = 0; j < bytes.length; j++) {
        bytes[j] += carry;
        // tslint:disable-next-line:no-bitwise
        carry = bytes[j] >> 8;
        // tslint:disable-next-line:no-bitwise
        bytes[j] &= 0xff;
      }

      while (carry) {
        // tslint:disable-next-line:no-bitwise
        bytes.push(carry & 0xff);
        // tslint:disable-next-line:no-bitwise
        carry >>= 8;
      }
    }

    for (let i = 0; hash[i] 