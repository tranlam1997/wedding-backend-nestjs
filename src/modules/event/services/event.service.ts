import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Event } from '../models/event.model';
import { Place } from '../../address/models/place.model';
import { Customer } from '../../customer/models/customer.model';
import { EventType } from '../models/event-type.model';
import fns from 'date-fns';
import { ChatRoom } from '../../chat/models/chat-room.model';
import { Transaction } from '../../transaction/models/transaction.model';
import { EventTransaction } from '../../transaction/models/event-transaction.model';
import { TransactionAttachment } from '../../transaction/models/transaction-attachment.interface';
import { EventAttachment } from '../../attachment/models/event-attachment.model';
import { EventMenu } from '../../menu/models/event-menu.model';

@Injectable()
export class EventService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Event) private eventModel: typeof Event,
    @InjectModel(ChatRoom) private chatRoomModel: typeof ChatRoom,
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
    @InjectModel(EventTransaction) private eventTransactionModel: typeof EventTransaction,
    @InjectModel(EventAttachment) private eventAttachmentModel: typeof EventAttachment,
    @InjectModel(EventMenu) private eventMenuModel: typeof EventMenu,
    @InjectModel(TransactionAttachment)
    private transactionAttachmentModel: typeof TransactionAttachment,
  ) { }

  async getEvents() {
    const result = await this.eventModel.findAll({
      include: [{ all: true }],
    });

    return {
      error: false,
      data: result,
      message: 'Event list',
    };
  }

  async getSchedule({ startDate, endDate }: { startDate: string; endDate: string }) {
    if (/^\d+$/.test(startDate) && /^\d+$/.test(endDate)) {
      const result = await this.eventModel.findAll({
        where: {
          startTime: {
            [sequelize.Op.gte]: startDate,
          },
          endTime: {
            [sequelize.Op.lte]: endDate,
          },
        },
        include: [
          {
            model: Place,
            required: false,
            attributes: ['id', 'name'],
          },
        ],
        attributes: ['id', 'title', 'startTime', 'endTime', 'guestEstimate', 'deposit'],
      });

      return {
        error: false,
        data: result,
        message: 'Event list',
      };
    }

    throw new BadRequestException('Invalid date format');
  }

  async getScheduleAtPlace({
    startDate,
    endDate,
    placeId,
  }: {
    startDate: string;
    endDate: string;
    placeId: string;
  }) {
    if (/^\d+$/.test(startDate) && /^\d+$/.test(endDate)) {
      const startTime = new Date(+startDate);
      startTime.setHours(0, 0, 0, 0);
      const start = startTime.getTime();
      const end = start + 60 * 60 * 24 * 1000;
      const result = await this.eventModel.findAll({
        where: {
          startTime: {
            [sequelize.Op.gte]: start,
          },
          endTime: {
            [sequelize.Op.lte]: end,
          },
          placeId,
        },
        include: [
          {
            model: Place,
            attributes: ['id', 'name'],
          },
          {
            model: Customer,
            required: false,
            attributes: ['name'],
          },
          {
            model: EventType,
            required: false,
            attributes: ['color'],
          },
        ],
        attributes: ['id', 'title', 'startTime', 'endTime', 'guestEstimate', 'deposit'],
      });

      return {
        error: false,
        data: result,
        message: 'Event list',
      };
    }

    throw new BadRequestException('Invalid date format');
  }

  async getEventByMonth({ year, month }: { year: string; month: string }) {
    const d = new Date(+year, +month, 1);
    const startOfM = d;
    const endOfM = fns.endOfMonth(d);
    const start = startOfM.getTime();
    const end = endOfM.getTime();

    const result = await this.eventModel.findAll({
      where: {
        startTime: {
          [sequelize.Op.gte]: start,
        },
        endTime: {
          [sequelize.Op.lte]: end,
        },
      },
      include: [
        {
          model: Place,
          attributes: ['id', 'name'],
        },
        {
          model: Customer,
          required: false,
          attributes: ['name'],
        },
        {
          model: EventType,
          required: false,
          attributes: ['color'],
        },
      ],
      attributes: ['id', 'title', 'startTime', 'endTime', 'guestEstimate', 'deposit'],
    });

    return {
      error: false,
      data: result,
      message: 'Event list',
    };
  }

  async getEventByDay({ year, month, day }: { year: string; month: string; day: string }) {
    //lấy ra event trong tháng, startDate lấy ngày đầu tuần (có thể nhảy sang tháng trc đó)
    //endDate lấy ngày cuối tuần
    let d = new Date(+year, +month, +day);
    const start = fns.startOfDay(d).getTime();
    const end = fns.endOfDay(d).getTime();

    const result = await this.eventModel.findAll({
      where: {
        startTime: {
          [sequelize.Op.gte]: start,
        },
        endTime: {
          [sequelize.Op.lte]: end,
        },
      },
      include: [
        {
          model: Place,
          attributes: ['id', 'name'],
        },
        {
          model: Customer,
          required: false,
          attributes: ['name'],
        },
        {
          model: EventType,
          required: false,
          attributes: ['color'],
        },
      ],
      attributes: ['id', 'title', 'startTime', 'endTime', 'guestEstimate', 'deposit'],
    });

    return {
      error: false,
      data: result,
      message: 'Event list',
    };
  }

  async getEventById(id: string) {
    const result = await this.eventModel.findByPk(id, {
      include: [{ all: true }],
    });

    return {
      error: false,
      data: result,
      message: 'Event detail',
    };
  }

  async createEvent(
    data: Event & {
      order: any;
      attachments: {
        url: string;
        extra: {
          id: string | number;
          filename: string;
          url: string;
          type: string;
          size: number;
        };
      }[];
      transaction: Transaction & { attachments: string };
    },
    userId: number,
  ) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { transaction, attachments, order, ...rest } = data;
      const result = await this.eventModel.create(rest, {
        transaction: transactionSequelize,
      });

      const chatRoom = await this.chatRoomModel.create(
        {
          id: result.id,
          name: result.title,
          type: 'event',
          creatorId: userId,
        },
        {
          transaction: transactionSequelize,
        },
      );

      if (transaction && transaction.id && transaction.value) {
        const transactionId = transaction.id;

        await this.transactionModel.create(
          {
            id: transactionId,
            value: transaction.value,
            date: transaction.date,
            note: transaction.note,
          },
          {
            transaction: transactionSequelize,
          },
        );

        await this.eventTransactionModel.create(
          {
            eventId: result.id,
            transactionId,
          },
          {
            transaction: transactionSequelize,
          },
        );

        const attachmentIds = transaction.attachments ? transaction.attachments.split(',') : [];
        if (attachmentIds.length) {
          attachmentIds
            .map((id) => [transactionId, id])
            .forEach((item) => {
              this.transactionAttachmentModel.create(
                {
                  transactionId,
                  attachmentId: item[1],
                },
                {
                  transaction: transactionSequelize,
                },
              );
            });
        }
      }

      //update attachment
      if (attachments && Array.isArray(attachments) && attachments.length) {
        attachments
          .map((e) => [result.id, e.extra.id])
          .forEach((item) => {
            this.eventAttachmentModel.create(
              {
                eventId: item[0],
                attachmentId: item[1],
              },
              {
                transaction: transactionSequelize,
              },
            );
          });
      }

      //update order
      if (Array.isArray(order) && order.length) {
        const data = order
          .map((e) => [result.id, e.id, e.price, e.amount])
          .forEach((item) => {
            this.eventMenuModel.create(
              {
                eventId: item[0],
                menuId: item[1],
                price: item[2],
                amount: item[3],
              },
              {
                transaction: transactionSequelize,
              },
            );
          });
      }

      return {
        error: false,
        data: result,
        message: 'Create event successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async updateEvent(
    data: Event & {
      attachments: {
        url: string;
        extra: {
          id: string | number;
          filename: string;
          url: string;
          type: string;
          size: number;
        };
      }[];
    } & { order: any },
    userId: number,
  ) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, attachments, order, ...rest } = data;
      const [affectedRows] = await this.eventModel.update(rest, {
        where: {
          id,
        },
        transaction: transactionSequelize,
      });

      if (!affectedRows) {
        throw new InternalServerErrorException('Failed to modify!');
      }

      //update attachment
      //attachments có dạng
      //url: string, extra: { filename: string, url, type: string, size }
      await this.eventAttachmentModel.destroy({
        where: {
          eventId: id,
        },
        transaction: transactionSequelize,
      });
      if (attachments && Array.isArray(attachments) && attachments.length) {
        attachments
          .map((e) => [id, e.extra.id])
          .forEach((item) => {
            this.eventAttachmentModel.create(
              {
                eventId: item[0],
                attachmentId: item[1],
              },
              {
                transaction: transactionSequelize,
              },
            );
          });
      }
      //update order
      await this.eventMenuModel.destroy({
        where: {
          eventId: id,
        },
        transaction: transactionSequelize,
      });

      if (Array.isArray(order) && order.length) {
        order
          .map((e) => [id, e.id, e.price, e.amount])
          .forEach((item) => {
            this.eventMenuModel.create(
              {
                eventId: item[0],
                menuId: item[1],
                price: item[2],
                amount: item[3],
              },
              {
                transaction: transactionSequelize,
              },
            );
          });
      }
      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Update event successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async deleteEventById(id: number) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const affectedRows = await this.eventModel.destroy({
        where: {
          id,
        },
        transaction: transactionSequelize,
      });

      if (!affectedRows) {
        throw new InternalServerErrorException('Failed to delete!');
      }

      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Delete event successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async updateCustomer(data: { id: number; customerId: number }) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, customerId } = data;
      const [affectedRows] = await this.eventModel.update(
        {
          customerId,
        },
        {
          where: {
            id,
          },
          transaction: transactionSequelize,
        },
      );

      if (!affectedRows) {
        throw new InternalServerErrorException('Failed to modify!');
      }

      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Update customer successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async updateTitle(data: { id: number; title: string }) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, title } = data;
      const [affectedRows] = await this.eventModel.update(
        {
          title,
          titleEn: stripAccents(title),
        },
        {
          where: {
            id,
          },
          transaction: transactionSequelize,
        },
      );

      if (!affectedRows) {
        throw new InternalServerErrorException('Failed to modify!');
      }

      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Update title successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async updateAttachment(data: {
    id: number;
    attachments: {
      url: string;
      extra: { id: number; filename: string; url: string; type: string; size: number };
    }[];
  }) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, attachments } = data;
      await this.eventAttachmentModel.destroy({
        where: {
          eventId: id,
        },
        transaction: transactionSequelize,
      });
      if (attachments && Array.isArray(attachments) && attachments.length) {
        attachments
          .map((e) => [id, e.extra.id])
          .forEach((item) => {
            this.eventAttachmentModel.create(
              {
                eventId: item[0],
                attachmentId: item[1],
              },
              {
                transaction: transactionSequelize,
              },
            );
          });
      }
      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Update attachment successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async updateGuestEstimate(data: { id: number; guestEstimate: string }) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, guestEstimate } = data;
      const [affectedRows] = await this.eventModel.update(
        {
          guestEstimate,
        },
        {
          where: {
            id,
          },
          transaction: transactionSequelize,
        },
      );

      if (!affectedRows) {
        throw new InternalServerErrorException('Failed to modify!');
      }

      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Update guess estimate successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async updatePlaceAndTime(data: {
    id: number;
    placeId: number;
    startTime: number;
    endTime: number;
    title: string;
  }) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, placeId, startTime, endTime, title } = data;
      const [affectedRows] = await this.eventModel.update(
        {
          placeId,
          startTime,
          endTime,
          title,
        },
        {
          where: {
            id,
          },
          transaction: transactionSequelize,
        },
      );

      if (!affectedRows) {
        throw new InternalServerErrorException('Failed to modify!');
      }

      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Update place and time successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async updateTime(data: { id: number; startTime: number; endTime: number }) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, startTime, endTime } = data;
      const [affectedRows] = await this.eventModel.update(
        {
          startTime,
          endTime,
        },
        {
          where: {
            id,
          },
          transaction: transactionSequelize,
        },
      );

      if (!affectedRows) {
        throw new InternalServerErrorException('Failed to modify!');
      }

      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Update time successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async updateCheckList(data: { id: number; checklist: string; templateId: number }) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, checklist, templateId } = data;
      const [affectedRows] = await this.eventModel.update(
        {
          checklist,
          typeId: templateId,
        },
        {
          where: {
            id,
          },
          transaction: transactionSequelize,
        },
      );

      if (!affectedRows) {
        throw new InternalServerErrorException('Failed to modify!');
      }

      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Update checklist successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async updateOrder(data: {
    id: number;
    order: {
      id: number;
      price: number;
      amount: number;
    }[];
  }) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, order } = data;
      await this.eventMenuModel.destroy({
        where: {
          eventId: id,
        },
        transaction: transactionSequelize,
      });

      if (Array.isArray(order) && order.length) {
        order
          .map((e) => [id, e.id, e.price, e.amount])
          .forEach((item) => {
            this.eventMenuModel.create(
              {
                eventId: item[0],
                menuId: item[1],
                price: item[2],
                amount: item[3],
              },
              {
                transaction: transactionSequelize,
              },
            );
          });
      }

      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Update order successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async updateTableCount(data: { id: number; tableCount: number }) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, tableCount } = data;
      const [affectedRows] = await this.eventModel.update(
        {
          tableCount,
        },
        {
          where: {
            id,
          },
          transaction: transactionSequelize,
        },
      );

      if (!affectedRows) {
        throw new InternalServerErrorException('Failed to modify!');
      }

      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Update table count successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async updateTableSize(data: { id: number; tableSize: number }) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, tableSize } = data;
      const [affectedRows] = await this.eventModel.update(
        {
          tableSize,
        },
        {
          where: {
            id,
          },
          transaction: transactionSequelize,
        },
      );

      if (!affectedRows) {
        throw new InternalServerErrorException('Failed to modify!');
      }

      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Update table size successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async updateFeedback(data: { id: number; feedback: string }) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, feedback } = data;
      const [affectedRows] = await this.eventModel.update(
        {
          feedback,
        },
        {
          where: {
            id,
          },
          transaction: transactionSequelize,
        },
      );

      if (!affectedRows) {
        throw new InternalServerErrorException('Failed to modify!');
      }

      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Update feedback successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async updateEnableChat(data: { id: number; enableChat: boolean }) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, enableChat } = data;
      const [affectedRows] = await this.eventModel.update(
        {
          enableChat,
        },
        {
          where: {
            id,
          },
          transaction: transactionSequelize,
        },
      );

      if (!affectedRows) {
        throw new InternalServerErrorException('Failed to modify!');
      }

      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Update enable chat successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }

  async cancelEvent(data: { id: number; isCanceled: boolean }) {
    const transactionSequelize = await this.sequelize.transaction();
    try {
      const { id, isCanceled } = data;
      const [affectedRows] = await this.eventModel.update(
        {
          isCanceled,
        },
        {
          where: {
            id,
          },
          transaction: transactionSequelize,
        },
      );

      if (!affectedRows) {
        throw new InternalServerErrorException('Failed to modify!');
      }

      await transactionSequelize.commit();

      return {
        status: true,
        message: 'Cancel event successfully',
      };
    } catch (err) {
      await transactionSequelize.rollback();
      throw new BadRequestException(err.message);
    }
  }
}
