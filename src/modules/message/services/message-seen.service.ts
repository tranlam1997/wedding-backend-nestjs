import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { MessageSeen } from '../models/message-seen.model';

@Injectable()
export class MessageSeenService {
  constructor(
    @InjectModel(MessageSeen) private messageSeenModel: typeof MessageSeen,
    private sequelize: Sequelize,
  ) {}

  async getMessageSeen() {
    const result = await this.messageSeenModel.findAll();
    return { error: false, data: result, message: 'Message Seen list.' };
  }

  async createMessageSeen({
    messageId,
    roomId,
    userId,
  }: {
    messageId: number;
    roomId: number;
    userId: number;
  }) {
    const seqTrans = await this.sequelize.transaction();
    try {
      await this.messageSeenModel.destroy({
        where: {
          roomId,
          userId,
        },
        transaction: seqTrans,
      });
      const result = await this.messageSeenModel.create(
        {
          roomId,
          userId,
          lastSeenId: messageId,
          time: new Date().getTime(),
        },
        {
          transaction: seqTrans,
        },
      );
      return { error: false, data: result, message: 'Message Seen created.' };
    } catch (err) {
      await seqTrans.rollback();
      return { error: true, data: err, message: 'Message Seen created failed.' };
    }
  }

  
}
