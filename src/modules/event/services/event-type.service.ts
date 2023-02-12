import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EventType } from '../models/event-type.model';

@Injectable()
export class EventTypeService {
  constructor(@InjectModel(EventType) private eventTypeModel: typeof EventType) {}

  async getEventType() {
    const result = await this.eventTypeModel.findAll();
    return {
      error: false,
      data: result,
      message: 'Event type list',
    };
  }

  async createEventType({ name, color }: { name: string; color: string }) {
    const result = await this.eventTypeModel.create({
      name,
      color,
    });
    return {
      error: false,
      data: result,
      message: 'Event type created',
    };
  }

  async updateEventTypeTemplateById({
    template,
    eventTypeId,
  }: {
    template: any;
    eventTypeId: number;
  }) {
    const result = await this.eventTypeModel.update(template, {
      where: {
        id: eventTypeId,
      },
    });
    return {
      error: false,
      data: result,
      message: 'Event type updated',
    };
  }

  async updateEventTypeNameAndColorById({
    name,
    color,
    evenTypeId,
  }: {
    name: string;
    color: string;
    evenTypeId: number;
  }) {
    const result = await this.eventTypeModel.update(
      {
        name,
        color,
      },
      {
        where: {
          id: evenTypeId,
        },
      },
    );
    return {
      error: false,
      data: result,
      message: 'Event type updated',
    };
  }

  async deleteEventTypeById(id: number) {
    const result = await this.eventTypeModel.destroy({
      where: {
        id,
      },
    });
    return {
      error: false,
      data: result,
      message: 'Event type deleted',
    };
  }

  async deleteMultiEventType(ids: number[]) {
    const result = await this.eventTypeModel.destroy({
      where: {
        id: ids,
      },
    });
    return {
      error: false,
      data: result,
      message: 'Event type deleted',
    };
  }
}
