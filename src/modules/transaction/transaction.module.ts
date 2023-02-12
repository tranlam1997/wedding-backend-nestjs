import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { AttachmentModule } from "../attachment/attachment.module";
import { EventTransaction } from "./models/event-transaction.model";
import { TransactionAttachment } from './models/transaction-attachment.interface';
import { Transaction } from "./models/transaction.model";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from './transaction.service';
import { EventModule } from '../event/event.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Transaction, EventTransaction, TransactionAttachment]),
        AttachmentModule,
        forwardRef(() => EventModule),
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
    exports: [TransactionService, SequelizeModule],
})
export class TransactionModule {}