import { DataSource, EntityManager, QueryRunner } from 'typeorm';

export class TransactionHelper {
  constructor(private readonly dataSource: DataSource) {}

  async runInTransaction<T>(
    work: (manager: EntityManager) => Promise<T>,
  ): Promise<T> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await work(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

export const TRANSACTION_HELPER = Symbol('TRANSACTION_HELPER');
