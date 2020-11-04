import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestCTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestCTO): Transaction {
    if (!title || !value || !type) {
      throw Error('Need to inform all 3 information requested');
    }

    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome') {
      if (total < value) {
        throw Error('Not enough money in the bank');
      }
    }

    const appointment = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return appointment;
  }
}

export default CreateTransactionService;
