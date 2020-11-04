import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionCTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    /* Maneira explicada no vídeo

    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, { value, type}: Transaction) => {
      if(type == "income")
        accumulator.income += value;
    else if(type == "outcome")
        accumulator.outcome += value;
        return accumulator;
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });
    const total = income - outcome;

    return ({income, outcome, total})
 */

    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((accumulator, element) => (accumulator += element.value), 0);
    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((accumulator, element) => (accumulator += element.value), 0);

    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionCTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
