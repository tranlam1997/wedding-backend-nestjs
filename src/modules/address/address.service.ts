import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { District } from './models/district.model';
import { Province } from './models/province.model';
import { Ward } from './models/ward.model';
import { Place } from './models/place.model';

@Injectable()
export class AddressService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(District) private districtModel: typeof District,
    @InjectModel(Ward) private wardModel: typeof Ward,
    @InjectModel(Place) private placeModel: typeof Place,
  ) {}

  async getProvinces() {
    return this.sequelize.query<Province>('SELECT * FROM provinces', {
      type: sequelize.QueryTypes.SELECT,
    });
  }

  async getDistrictsOfProvince(provinceCode: string) {
    return await this.districtModel.findAll({
      where: {
        provinceCode,
      },
    });
  }

  async getWardsOfDistrict(districtCode: string) {
    return await this.wardModel.findAll({
      where: {
        districtCode,
      },
    });
  }

  async getPlaces() {
    const result = await this.sequelize.query<{
      id: number;
      name: string;
      settings: string;
      attachments: string;
    }>(
      `
            SELECT p.id, p.name, p.settings, GROUP_CONCAT(a.id SEPARATOR ',') attachments
            FROM places p
            LEFT JOIN place_attachments pa
                ON p.id = pa.place_id
            LEFT JOIN attachments a
                ON a.id = pa.attachment_id
            GROUP BY p.id
            `,
      {
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return {
      error: false,
      data: result,
      message: 'Places list',
    };
  }

  async createPlace({ name, settings }: { name: string; settings: string }) {
    const result = await this.placeModel.create({
      name,
      settings,
    });

    return {
      error: false,
      data: result,
      message: 'Place created',
    };
  }

  async updateSettingsById({ placeId, settings }: { placeId: number; settings: string }) {
    await this.placeModel.update(
      {
        settings,
      },
      {
        where: {
          id: placeId,
        },
      },
    );

    return {
      error: false,
      data: null,
      message: 'Place updated',
    };
  }

  async deleteMultiPlaces(placeIds: number[]) {
    placeIds = placeIds.map(Number);

    if (!placeIds.length) {
      throw new BadRequestException('Place ids is required');
    }

    await this.placeModel.destroy({
      where: {
        id: {
          [sequelize.Op.in]: placeIds,
        },
      },
    });

    return {
      error: false,
      data: null,
      message: 'Places deleted',
    };
  }

  async updateNameById({ placeId, name }: { placeId: number; name: string }) {
    await this.placeModel.update(
      {
        name,
      },
      {
        where: {
          id: placeId,
        },
      },
    );

    return {
      error: false,
      data: null,
      message: 'Place updated',
    };
  }

  async updateAttachmentsById({
    placeId,
    attachments,
  }: {
    placeId: number;
    attachments: number[];
  }) {
    await this.sequelize.query(
      `
        DELETE FROM place_attachments
        WHERE place_id = ${placeId}
      `,
    );

    if (attachments.length) {
      await this.sequelize.query(
        `
            INSERT INTO place_attachments (place_id, attachment_id)
            VALUES ${attachments.map((attachmentId) => `(${placeId}, ${attachmentId})`).join(',')}
        `,
      );
    }

    return {
      error: false,
      data: null,
      message: 'Place updated',
    };
  }
}
