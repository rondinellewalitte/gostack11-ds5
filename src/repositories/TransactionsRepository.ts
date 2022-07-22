import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
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
    const income: number = this.transactions.reduce(
      (acumulator, transaction) =>
        acumulator + (transaction.type === 'income' ? transaction.value : 0),
      0,
    );
    const outcome: number = this.transactions.reduce(
      (acumulator, transaction) =>
        acumulator + (transaction.type === 'outcome' ? transaction.value : 0),
      0,
    );
    const total: number = income - outcome;

    const totalBalance: Balance = { income, outcome, total };

    return totalBalance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
