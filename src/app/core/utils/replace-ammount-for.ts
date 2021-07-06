/**
 * In case of masstransaction we need to calculate ammount for one particular address.
 * @param address - address for which ammount will be calculated
 */
export function replaceAmountFor(address: string) {
  return function(transactions: any[]) {
    return transactions.map((transaction: any) => {
      return {
        ...transaction,
        amount: transactionAmount(transaction, address)
      };
    });
  };
}

functi