import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { db, admin } from '../../common/firebase/firebase-config';
import { randomUUID } from 'crypto';
import { ChatRoom } from '../chat/models/chat-room.model';
import { Participant } from '../chat/models/participant.model';
import { doRequest } from '@src/utils';
import { uploadBuffer } from '@src/utils/s3';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(ChatRoom) private chatRoomModel: typeof ChatRoom,
    @InjectModel(Participant) private participantModel: typeof Participant,
    private sequelize: Sequelize,
  ) {}

  async getUsers() {
    const result = await this.userModel.findAll({
      include: [{ all: true }],
    });
    return {
      error: false,
      data: result,
      message: 'User list',
    };
  }

  async getCurrentUserInfo(userId: number) {
    const result = await this.userModel.findOne({
      where: {
        id: userId,
      },
      include: [{ all: true }],
    });
    return {
      error: false,
      data: result,
      message: 'User list',
    };
  }

  async updateCurrentUserAvatar({ userId, photoId }: { userId: number; photoId: string }) {
    const result = await this.userModel.update(
      {
        photoId,
      },
      {
        where: {
          id: userId,
        },
      },
    );
    return {
      error: false,
      data: result,
      message: 'User list',
    };
  }

  async createUser({ email, password, phoneNumber, displayName, roleId }) {
    const seqTrans = await this.sequelize.transaction();
    const uid = randomUUID();
    let result = null;
    try {
      result = await admin.auth().createUser(
        phoneNumber
          ? {
              uid,
              displayName,
              email,
              password,
              phoneNumber,
            }
          : {
              uid,
              displayName,
              email,
              password,
            },
      );
      console.log(result);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    const users = await this.userModel.findAll();
    const userIds = users.map((u) => u.id);

    try {
      // open transaction
      const result = await this.userModel.create(
        {
          displayName,
          email,
          tel: phoneNumber,
          uid,
          roleId,
          active: true,
        },
        {
          transaction: seqTrans,
        },
      );
      //nếu có từ 2 user trở lên thì mới tạo direct chatRoom
      if (userIds.length) {
        //tạo phòng chat direct mỗi khi có user mới
        const data = userIds.map((u) => {
          const { id } = u;
          //id của chat room giữa 2 user với nhau qui ước dạng userID1-userID2 trong đó userID1 < userID2
          const roomId = result.id < id ? `${result.id}-${id}` : `${id}-${result.id}`;
          return [roomId, 'direct'];
        });
        //cho phép chat với chính mình
        data.push([`${result.id}-${result.id}`, `direct`]);

        data.forEach((item) => {
          this.chatRoomModel.create(
            {
              id: +item[0],
              type: item[1],
            },
            {
              transaction: seqTrans,
            },
          );
        });

        //insert dữ liệu vào bảng Participant
        const time = new Date().getTime();
        const participant_sql = `
				INSERT INTO Participant (id, user_id, room_id, time)
				VALUES ?
			`;

        const participantData = [];
        userIds.forEach((u) => {
          const { id } = u;
          let participantId = randomUUID();
          //id của chat room giữa 2 user với nhau qui ước dạng userID1-userID2 trong đó userID1 <= userID2
          const roomId = result.id < id ? `${result.id}-${id}` : `${id}-${result.id}`;
          participantData.push([participantId, id, roomId, time]);

          participantId = randomUUID();
          participantData.push([participantId, result.id, roomId, time]);
        });

        participantData.forEach((item) => {
          this.participantModel.create(
            {
              id: item[0],
              userId: item[1],
              roomId: item[2],
              time: item[3],
            },
            {
              transaction: seqTrans,
            },
          );
        });
      }

      const customClaims = {
        userId: result.id,
        roleId,
      };

      await admin.auth().setCustomUserClaims(uid, customClaims);
      await seqTrans.commit();
      return {
        status: true,
        message: 'Create user successfully',
      };
    } catch (error) {
      await seqTrans.rollback();
      throw new BadRequestException(error.message);
    }
  }

  async updateUserAvatar({
    photoUrl,
    photoId,
    userId,
    uid,
  }: {
    photoUrl: string;
    photoId: string;
    userId: string;
    uid: string;
  }) {
    const seqTrans = await this.sequelize.transaction();
    try {
      const { displayName, tel } = await this.userModel.findOne({
        where: {
          id: userId,
        },
        attributes: ['displayName', 'tel'],
      });

      //download ảnh google về và đẩy lên s3
      const body = await doRequest(photoUrl);
      await uploadBuffer(body, photoId);

      await admin.auth().updateUser(uid, {
        displayName,
        phoneNumber: tel || null,
      });

      await this.userModel.update(
        {
          photoId,
        },
        {
          where: {
            id: userId,
          },
          transaction: seqTrans,
        },
      );

      const customClaims = {
        userId,
        photoId,
      };

      await admin.auth().setCustomUserClaims(uid, customClaims);
      await seqTrans.commit();
      return {
        status: true,
        message: 'Update user avatar successfully',
      };
    } catch (error) {
      await seqTrans.rollback();
      throw new BadRequestException(error.message);
    }
  }

  async updateUserRole({ userId, roleId }: { userId: number; roleId: number }) {
    const { uid } = await this.userModel.findOne({
      where: {
        id: userId,
      },
      attributes: ['uid'],
    });

    const seqTrans = await this.sequelize.transaction();
    try {
      await this.userModel.update(
        {
          roleId,
        },
        {
          where: {
            id: userId,
          },
          transaction: seqTrans,
        },
      );

      const customClaims = {
        userId,
        roleId,
      };

      await admin.auth().setCustomUserClaims(uid, customClaims);
      await seqTrans.commit();
      return {
        status: true,
        message: 'Update user role successfully',
      };
    } catch (error) {
      await seqTrans.rollback();
      throw new BadRequestException(error.message);
    }
  }
}
