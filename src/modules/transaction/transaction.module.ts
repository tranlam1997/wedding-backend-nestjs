import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { EventTransaction } from "./models/event-transaction.model";
import { TransactionAttachment } from './models/transaction-attachment.interface';

@Module({
    imports: [SequelizeModule.forFeature([EventTransaction, TransactionAttachment])],
    controllers: [],
    providers: [],
    exports: [],
})
export class TransactionModule {}