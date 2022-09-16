import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { EncoderService, TransactionTypes } from '../../../core';

interface AnchorData {
  base64: string;
  bas