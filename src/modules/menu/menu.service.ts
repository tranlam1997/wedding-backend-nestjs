import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Menu } from './models/menu.model';

@Injectable()
export class MenuService {
  constructor(@InjectModel(Menu) private menuModel: typeof Menu) {}

  async getMenu() {
    const result = await this.menuModel.findAll();
    return {
      error: false,
      data: result,
      message: 'Menu list',
    };
  }

  async createMenu({ name, amount, price }: { name: string; amount: string; price: number }) {
    const result = await this.menuModel.create({
      name,
      amount,
      price,
    });
    return {
      error: false,
      data: result,
      message: 'Menu created',
    };
  }

  async updateMenuById({
    name,
    amount,
    price,
    menuId,
  }: {
    name: string;
    amount: string;
    price: number;
    menuId: number;
  }) {
    const result = await this.menuModel.update(
      {
        name,
        amount,
        price,
      },
      {
        where: {
          id: menuId,
        },
      },
    );
    return {
      error: false,
      data: result,
      message: 'Menu updated',
    };
  }

  async deleteMenuById(menuId: number) {
    const result = await this.menuModel.destroy({
      where: {
        id: menuId,
      },
    });
    return {
      error: false,
      data: result,
      message: 'Menu deleted',
    };
  }
}
