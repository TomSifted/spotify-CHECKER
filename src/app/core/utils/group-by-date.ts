import * as moment from 'moment';

export interface TransactionsGroup {
  date: string;
  transactions: any[];
}

/**
 * Groups transactions by same date
 * @param transactions - array of transactions
 */
export function groupByDate(transactions: any[]): TransactionsGroup