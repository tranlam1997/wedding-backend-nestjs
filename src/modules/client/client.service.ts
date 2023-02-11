import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './models/client.model';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client) private clientModel: typeof Client) {}

  async getClients() {
    const clients = await this.clientModel.findAll({
      attributes: ['version', 'type', 'value'],
    });
    return {
      error: false,
      data: clients,
      message: 'Client version',
    };
  }

  async updateClient(data: { version: string; type: string; value: string }) {
    const client = await this.clientModel.update(
      {
        version: data.version,
        type: data.type,
        value: data.value,
      },
      {
        where: {},
      },
    );

    return {
      status: true,
      message: 'Update client version success',
    };
  }
}
