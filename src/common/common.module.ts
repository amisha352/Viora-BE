import { Module, Global } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppLogger } from './logger/app.logger';
import { TransactionHelper, TRANSACTION_HELPER } from './helpers/transaction.helper';

@Global()
@Module({
  providers: [
    AppLogger,
    {
      provide: TRANSACTION_HELPER,
      useFactory: (dataSource: DataSource) => new TransactionHelper(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [AppLogger, TRANSACTION_HELPER],
})
export class CommonModule {}
