import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

@Injectable()
export class EncoderService {
  private alphabet: string;
  private alphabetMap: { [key: string]: number };

  constructor() {
    this.alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    this.alphabetMap = this.alphabet.split('').reduce(
      