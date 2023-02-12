import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './models/transaction.model';
import { EventTransaction } from './models/event-transaction.model';
import { Sequelize } from 'sequelize-typescript';
import sequelize from 'sequelize';
import { TransactionAttachment } from './models/transaction-attachment.interface';
import { Event } from '../event/models/event.model';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
    @InjectModel(EventTransaction) private eventTransactionModel: typeof EventTransaction,
    @InjectModel(TransactionAttachment)
    private transactionAttachmentModel: typeof TransactionAttachment,
    @InjectModel(Event) private eventModel: typeof Event,
    private sequelize: Sequelize,
  ) {}

  async getDepositByEventId({ eventId }: { eventId: number }) {
    const result = await this.transactionModel.findAll({
      where: {
        '$EventTransactions.eventId$': eventId,
      },
      include: [
        {
          model: EventTransaction,
          as: 'EventTransactions',
          where: {
            transactionId: Sequelize.col('transactions.id'),
          },
        },
      ],
      attributes: [[Sequelize.fn('SUM', Sequelize.col('value')), 'deposit']],
    });

    return {
      error: false,
      data: result,
      message: 'Deposit',
    };
  }

  async getEvent(eventId: number) {
    const result = await this.sequelize.query<{
      id: number;
      value: number;
      date: Date;
      note: string;
      attachments: string;
    }>(
      `
        SELECT 
            t.id, 
            t.value, 
            t.date, 
            t.note,
            GROUP_CONCAT(a.id SEPARATOR ',') attachments
        FROM transactions t
        LEFT JOIN event_transactions e
            ON t.id = e.transaction_id
        LEFT JOIN transaction_attachments ta
            ON t.id = ta.transaction_id
        LEFT JOIN attachments a
            ON a.id = ta.attachment_id 
        WHERE e.event_id = ?
        GROUP BY t.id
    `,
      {
        replacements: [eventId],
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return {
      error: false,
      data: result,
      message: 'Event',
    };
  }

  async createTransaction({
    eventId,
    value,
    date,
    note,
    attachments,
  }: {
    eventId: number;
    value: number;
    date: number;
    note: string;
    attachments: any;
  }) {
    const attachmentIds = attachments ? attachments.split(',') : [];
    const seqTrans = await this.sequelize.transaction();
    try {
      const result = await this.transactionModel.create(
        {
          value,
          date,
          note,
        },
        {
          transaction: seqTrans,
        },
      );

      await this.eventTransactionModel.create({
        eventId,
        transactionId: result.id,
      });

      if (attachmentIds.length) {
        attachmentIds
          .map((attachmentId) => [result.id, attachmentId])
          .forEach((item) => {
            this.transactionAttachmentModel.create(
              {
                transactionId: item[0],
                attachmentId: item[1],
              },
              {
                transaction: seqTrans,
              },
            );
          });
      }

      const info = await this.transactionModel.findOne({
        where: {
          '$EventTransactions.eventId$': eventId,
        },
        include: [
          {
            model: EventTransaction,
            as: 'EventTransactions',
            where: {
              transactionId: Sequelize.col('transactions.id'),
            },
          },
        ],
        attributes: [[Sequelize.fn('SUM', Sequelize.col('value')), 'deposit']],
      });

      await this.eventModel.update(
        {
          deposit: info.value || 0,
        },
        {
          where: {
            id: eventId,
          },
          transaction: seqTrans,
        },
      );

      await seqTrans.commit();

      return {
        error: false,
        data: result,
        message: 'Transaction created',
      };
    } catch (err) {
      await seqTrans.rollback();
      return {
        error: true,
        data: err,
        message: 'Transaction failed',
      };
    }
  }

  async deleteTransactionById(id: number) {
    const seqTrans = await this.sequelize.transaction();
    try {
      const result = await this.transactionModel.destroy({
        where: {
          id,
        },
        transaction: seqTrans,
      });

      await this.eventTransactionModel.destroy({
        where: {
          transactionId: id,
        },
        transaction: seqTrans,
      });

      await this.transactionAttachmentModel.destroy({
        where: {
          transactionId: id,
        },
        transaction: seqTrans,
      });

      await seqTrans.commit();

      return {
        error: false,
        data: result,
        message: 'Transaction deleted',
      };
    } catch (err) {
      await seqTrans.rollback();
      return {
        error: true,
        data: err,
        message: 'Transaction failed',
      };
    }
  }
}
