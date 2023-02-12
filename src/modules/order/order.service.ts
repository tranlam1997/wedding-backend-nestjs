import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Menu } from '../menu/models/menu.model';
import { EventMenu } from '../menu/models/event-menu.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Menu) private menuModel: typeof Menu,
  ) {}

  async getOrderByEventId(eventId: number) {
    const result = await this.menuModel.findAll({
        where: {
            '$EventMenus.eventId$': eventId,
        },
        include: [
            {
                model: EventMenu,
                as: 'EventMenus',
            }
        ]
    });
    return {
      error: false,
      data: result,
      message: 'Order list',
    };
  }
}
