import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@src/modules/user/models/user.model';
import { Message } from '../models/message.model';
import { ChatRoom } from '../../chat/models/chat-room.model';
import { MessageAttachment } from '../../attachment/models/message-attachment.model';
import { Attachment } from '../../attachment/models/attachment.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message) private messageModel: typeof Message,
    @InjectModel(MessageAttachment) private messageAttachmentModel: typeof MessageAttachment,
    private sequelize: Sequelize,
  ) {}

  async getMessageByRoomId(roomId: number, time: number) {
    if (time && Number(time) && Number(time) > 0) {
      const result = await this.messageModel.findAll({
        where: {
          roomId: roomId,
          time: {
            $lt: new Date(Number(time)),
          },
        },
        include: [
          {
            model: User,
          },
          {
            model: ChatRoom,
          },
          {
            model: MessageAttachment,
            required: false,
            where: {
              messageId: Sequelize.col('messages.state'),
            },
            include: [
              {
                model: Attachment,
                required: false,
                where: {
                  id: Sequelize.col('message_attachments.attachmentId'),
                },
              },
            ],
          },
        ],
        order: [['time', 'DESC']],
        limit: 100,
      });
      return { error: false, data: result, message: 'messages list.' };
    }
    const result = await this.messageModel.findAll({
      where: {
        roomId: roomId,
      },
      include: [
        {
          model: User,
        },
        {
          model: ChatRoom,
        },
        {
          model: MessageAttachment,
          required: false,
          where: {
            messageId: Sequelize.col('messages.state'),
          },
          include: [
            {
              model: Attachment,
              required: false,
              where: {
                id: Sequelize.col('message_attachments.attachmentId'),
              },
            },
          ],
        },
      ],
      order: [['time', 'DESC']],
      limit: 100,
    });
    return { error: false, data: result, message: 'messages list.' };
  }

  async createMessage(message: Partial<Message> & { attachments: any }, userId: number) {
    const seqTransaction = await this.sequelize.transaction();
    try {
      const { attachments, ...rest } = message;
      const result = await this.messageModel.create(rest, { transaction: seqTransaction });
      if (Array.isArray(attachments) && attachments.length) {
        attachments
          .map((e) => [result.id, e.id])
          .forEach((item) => {
            this.messageAttachmentModel.create(
              { messageId: item[0], attachmentId: item[1] },
              { transaction: seqTransaction },
            );
          });
      }
      return { error: false, data: result, message: 'message created.' };
    } catch (err) {
      await seqTransaction.rollback();
      return { error: true, data: err, message: 'message created.' };
    }
  }

  async updateMessageContent({
    content,
    messageId,
    roomId,
    userId,
  }: {
    content: string;
    messageId: number;
    roomId: number;
    userId: number;
  }) {
    const result = await this.messageModel.update(
      {
        content,
      },
      {
        where: {
          id: messageId,
        },
      },
    );
    return { error: false, data: result, message: 'message updated.' };
  }

  async updateLikeMessage({
    likes,
    messageId,
    roomId,
    userId,
  }: {
    likes: string;
    messageId: number;
    roomId: number;
    userId: number;
  }) {
    if (messageId && roomId) {
      const result = await this.messageModel.update(
        {
          likes,
        },
        {
          where: {
            id: messageId,
          },
        },
      );
      return { error: false, data: result, message: 'message updated.' };
    }
    throw new BadRequestException('messageId and roomId are required');
  }
}
