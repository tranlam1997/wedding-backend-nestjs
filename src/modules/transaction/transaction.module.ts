import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { EventTransaction } from "./models/event-transaction.model";
import { TransactionAttachment } from './models/transaction-attachment.interface';
import { Transaction } from "./models/transaction.model";
import { TransactionController } from "./transaction.controller";

@Module({
    imports: [SequelizeModule.forFeature([Transaction, EventTransaction, TransactionAttachment])],
    controllers: [TransactionController],
    providers: [],
    exports: [SequelizeModule],
})
export class TransactionModule {}