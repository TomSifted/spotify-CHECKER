import { TransactionTypes } from '../transaction-types';
/**
 * Factory of transaction filters.
 * Returns function which accepts transactions array and returns filtered by provided types numbers
 * @param types - transaction types to filter
 */
export function transactionsFilter(...types: TransactionTypes[]) {
  return function(transactions: