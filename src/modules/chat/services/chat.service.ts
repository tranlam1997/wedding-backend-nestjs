import { Injectable } from '@nestjs/common';
import sequelize, { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ChatService {
  constructor(private sequelize: Sequelize) {}

  async getRecentMessagesLite(userId: number) {
    const result = await this.sequelize.query<{
      messageId: number;
      roomId: number;
      userId: number;
      time: number;
    }>(
      `
        WITH top_recent_messages
        AS (
                SELECT *,
                    row_number() OVER (
                        PARTITION BY room_id ORDER BY time DESC,
                            id ASC
                        ) AS row_num
                FROM messages
            )
        SELECT 
            t.id messageId,
            t.room_id roomId,
            t.user_id userId,
            t.time
        FROM top_recent_messages t
        INNER JOIN (
            SELECT 
                c.id
            FROM chat_rooms c
            INNER JOIN participants p
                ON p.room_id = c.id
            WHERE c.type != 'event' AND p.user_id = ?
        ) c
            ON c.id = t.room_id
        WHERE row_num <= 20
        GROUP BY t.id
    `,
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return { error: false, data: result, message: 'top 20 recent messages per event' };
  }

  async getRecentEventMessagesLite(userId: number) {
    const result = await this.sequelize.query<{
      messageId: number;
      roomId: number;
      userId: number;
      time: number;
    }>(
      `
      WITH top_recent_messages
      AS (
              SELECT *,
                  row_number() OVER (
                      PARTITION BY room_id ORDER BY time DESC,
                          id ASC
                      ) AS row_num
              FROM messages
          )
      SELECT 
          t.id messageId,
          t.room_id roomId,
          t.user_id userId,
          t.time
      FROM top_recent_messages t
      INNER JOIN (
          SELECT 
              c.id
          FROM events e
          INNER JOIN chat_rooms c
              ON e.id = c.id
      ) c
          ON c.id = t.room_id
      
      WHERE row_num <= 20
      GROUP BY t.id
  `,
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return { error: false, data: result, message: 'top 20 recent messages per event' };
  }

  async getRecentMessages(userId: number) {
    const result = await this.sequelize.query<{
      id: number;
      userId: number;
      photoId: string;
      displayName: string;
      roomId: number;
      time: number;
      content: string;
      likes: number;
      attachments: string;
    }>(
      `
        WITH top_recent_messages
        AS (
                SELECT *,
                    row_number() OVER (
                        PARTITION BY room_id ORDER BY time DESC,
                            id ASC
                        ) AS row_num
                FROM messages
            )
        SELECT 
            t.id,
            t.user_id userId,
            u.photo_id,
            u.display_name displayName,
            t.room_id roomId,
            t.time,
            t.content,
            t.likes,
            GROUP_CONCAT(CONCAT(a.id, '$', a.filename, '$', a.type, '$', a.size, '$', a.width, '$', a.height, '$', a.preview_id) SEPARATOR ',') attachments

        FROM top_recent_messages t
        INNER JOIN users u
            ON t.user_id = u.id
        INNER JOIN (
            SELECT 
                c.id
            FROM chat_rooms c
            INNER JOIN participants p
                ON p.room_id = c.id
            WHERE c.type != 'event' AND p.user_id = ?
        ) c
            ON c.id = t.room_id
        
        LEFT JOIN message_attachments ma
            ON t.id = ma.message_id
        LEFT JOIN attachments a
            ON a.id = ma.attachment_id
        WHERE row_num <= 20
        GROUP BY t.id
    `,
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return { error: false, data: result, message: 'top 20 recent messages per event' };
  }

  async getRecentEventMessages(userId: number) {
    const result = await this.sequelize.query<{
      id: number;
      userId: number;
      photoId: string;
      displayName: string;
      roomId: number;
      time: number;
      content: string;
      likes: number;
      attachments: string;
    }>(
      `
        WITH top_recent_messages
        AS (
                SELECT *,
                    row_number() OVER (
                        PARTITION BY room_id ORDER BY time DESC,
                            id ASC
                        ) AS row_num
                FROM messages
            )
        SELECT 
            t.id,
            t.user_id userId,
            u.photo_id,
            u.display_name displayName,
            t.room_id roomId,
            t.time,
            t.content,
            t.likes,
            GROUP_CONCAT(CONCAT(a.id, '$', a.filename, '$', a.type, '$', a.size, '$', a.width, '$', a.height, '$', a.preview_id) SEPARATOR ',') attachments

        FROM top_recent_messages t
        INNER JOIN users u
            ON t.user_id = u.id
        INNER JOIN (
            SELECT 
                c.id
            FROM events e
            INNER JOIN chat_rooms c
                ON e.id = c.id
            INNER JOIN participants p
                ON c.id = p.room_id
            WHERE e.enable_chat IS TRUE AND (p.user_id = ? OR p.user_id IS NULL) 
        ) c
            ON c.id = t.room_id
        
        LEFT JOIN message_attachments ma
            ON t.id = ma.message_id
        LEFT JOIN attachments a
            ON a.id = ma.attachment_id
        WHERE row_num <= 20
        GROUP BY t.id
    `,
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return { error: false, data: result, message: 'top 20 recent messages per event' };
  }

  async getEmptyChatrooms() {
    const result = await this.sequelize.query<{
      id: number;
      name: string;
    }>(
      `
        SELECT 
            c.id roomId,
            c.name roomName
        FROM chat_rooms c
        LEFT JOIN messages m
            ON c.id = m.room_id
        GROUP BY c.id
        HAVING COUNT(m.id) = 0
    `,
      {
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return { error: false, data: result, message: 'list empty chatroom' };
  }

  async getChatRoomById(roomId: number) {
    const result = await this.sequelize.query<{
      id: number;
      name: string;
      type: string;
      photoId: string;
      backgroundId: string;
      description: string;
      creatorId: number;
      displayName: string;
      createdAt: Date;
      memberCount: number;
      members: string;
      participantId: number;
    }>(
      `
        SELECT 
            e.id , 
            e.name, 
            e.type, 
            e.photoID, 
            e.backgroundID, 
            e.description, 
            e.creator_id creatorId,
            u.display_name creatorName,
            e.created_at createdAt,
            count(p.user_id) memberCount,
            GROUP_CONCAT(u.id SEPARATOR ',') members,
            p.id participantId
        FROM chat_rooms e 
        LEFT JOIN participants p 
            ON p.room_id = e.id 
        LEFT JOIN users u
            ON u.id = p.user_id
        WHERE e.id = ?
        GROUP BY p.room_id
`,
      {
        replacements: [roomId],
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return { error: false, data: result, message: 'chat room' };
  }

  async getPublicChatRooms(userId: number) {
    const result = await this.sequelize.query<{
      id: number;
      name: string;
      photoId: string;
      backgroundId: string;
      type: string;
      creatorId: number;
      displayName: string;
      createdAt: Date;
    }>(
      `
        SELECT 
            c.id,
            c.name,
            c.photoID,
            c.backgroundID,
            c.type,
            c.creator_id creatorId,
            u.display_name creatorName,
            c.created_at createdAt
        FROM chat_rooms c
        LEFT JOIN users u
            ON c.creator_id = u.id
        WHERE c.type IS NULL OR c.type = ''
        GROUP BY c.id
    `,
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return { error: false, data: result, message: 'list empty chat room' };
  }

  async getPrivateChatRooms(userId: number) {
    const result = await this.sequelize.query<{
      id: number;
      name: string;
      photoId: string;
      backgroundId: string;
      type: string;
      memberCount: number;
    }>(
      `
        SELECT 
            c.id,
            c.name,
            c.photoId,
            c.backgroundId,
            c.type,
            count(p.user_id) memberCount
        FROM participants p
        INNER JOIN chat_rooms c 
                ON p.room_id = c.id
        WHERE c.type = 'private' AND  p.user_id = ?
        GROUP BY p.room_id
    `,
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return { error: false, data: result, message: 'list chat room' };
  }

  async getNormalChatRooms(userId: number) {
    const result = await this.sequelize.query<{
      id: number;
      name: string;
      photoId: string;
      backgroundId: string;
      type: string;
      memberCount: number;
    }>(
      `
        SELECT 
            c.id,
            c.name,
            c.photoId,
            c.backgroundId,
            c.type,
            count(p.user_id) memberCount
        FROM participants p
        INNER JOIN chat_rooms c 
                ON p.room_id = c.id
        WHERE  p.user_id = ?
        GROUP BY p.room_id
    `,
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return { error: false, data: result, message: 'list chat room' };
  }

  async getEventChatRooms(userId: number) {
    const result = await this.sequelize.query<{
      id: number;
      eventTitle: string;
      startTime: Date;
      endTime: Date;
      placeName: string;
    }>(
      `
        SELECT 
            c.id,
            e.title eventTitle,
            e.start_time startTime,
            e.end_time endTime,
            pl.name placeName
        FROM events e
        INNER JOIN chat_rooms c
            ON e.id = c.id
        LEFT JOIN places pl 
            ON pl.id = e.place_id
        WHERE e.enable_chat IS TRUE
    `,
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return { error: false, data: result, message: 'list chat room' };
  }

  async getEventChatRoomById(eventId: number) {
    const result = await this.sequelize.query<{
      id: number;
      eventTitle: string;
      startTime: Date;
      endTime: Date;
      placeName: string;
    }>(
      `
        SELECT 
            c.id,
            e.title eventTitle,
            e.start_time startTime,
            e.end_time endTime,
            pl.name placeName
        FROM events e
        INNER JOIN chat_rooms c
            ON e.id = c.id
        LEFT JOIN places pl 
            ON pl.id = e.place_id
        WHERE e.id = ?
    `,
      {
        replacements: [eventId],
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return { error: false, data: result, message: 'list chat room' };
  }

  async createChatRoom(
    data: {
      name: string;
      type: string;
      photoId: string;
      backgroundId: string;
    },
    userId: number,
  ) {
    const time = new Date().getTime();
    let { name, type, photoId, backgroundId } = data;
    const transaction = await this.sequelize.transaction();
    try {
      const chatRoom = await this.sequelize.query(
        `
                INSERT INTO chat_rooms (name, type, photo_id, background_id, creator_id, created_at) 
                VALUES (?, ?, ?, ?, ?, ?)
            `,
        {
          replacements: [name, type, photoId, backgroundId, userId, time],
          type: sequelize.QueryTypes.INSERT,
          transaction,
        },
      );

      const chatRoomId = chatRoom[0];

      await this.sequelize.query(
        `
                INSERT INTO participants (room_id, user_id, created_at) 
                VALUES (?, ?, ?)
            `,
        {
          replacements: [chatRoomId, userId, time],
          type: sequelize.QueryTypes.INSERT,
          transaction,
        },
      );

      const content = '';
      const msg_type_join_room = 'JOIN_ROOM';
      await this.sequelize.query(
        `
            INSERT INTO messages (room_id, user_id, content, time, type) 
            VALUES (?,?,?,?,?,?)
        `,
        {
          replacements: [chatRoomId, userId, content, time, msg_type_join_room],
          type: sequelize.QueryTypes.INSERT,
          transaction,
        },
      );

      const content2 = '';
      const msg_type_create_room = 'CREATE_ROOM';
      await this.sequelize.query(
        `
        INSERT INTO messages (room_id, user_id, content, time, type) 
        VALUES (?,?,?,?,?,?)
    `,
        {
          replacements: [chatRoomId, userId, content2, time, msg_type_create_room],
          type: sequelize.QueryTypes.INSERT,
          transaction,
        },
      );
      await transaction.commit();
      return { status: true, id: chatRoomId, message: 'success' };
    } catch (error) {
      await transaction.rollback();
      let message = `Không thành công`;
      if (error.errno === 1062) {
        message = `Tên phòng đã tồn tại!`;
      }
      return { status: false, error, message };
    }
  }

  async updateChatRoom(data: {
    id: number;
    name: string;
    photoId: string;
    backgroundId: string;
    type: string;
    description: string;
  }) {
    let { id, name, photoId, backgroundId, type, description } = data;
    if (!type) {
      type = '';
    }
    const transaction = await this.sequelize.transaction();
    try {
      await this.sequelize.query(
        `
                UPDATE chat_rooms SET name = ?, photo_id = ?, background_id = ?, type = ?, description = ? WHERE id = ?
            `,
        {
          replacements: [name, photoId, backgroundId, type, description, id],
          type: sequelize.QueryTypes.UPDATE,
          transaction,
        },
      );
      await transaction.commit();
      return { status: true, message: 'Successfully modified!' };
    } catch (error) {
      await transaction.rollback();
      let message = `Không thành công`;
      if (error.errno === 1062) {
        message = `Tên phòng đã tồn tại!`;
      }
      return { status: false, error, message };
    }
  }

  async deleteParticipant(roomId: number, userId: number) {
    const transaction = await this.sequelize.transaction();
    try {
      await this.sequelize.query(
        `
                DELETE FROM participants WHERE room_id = ? AND user_id = ?
            `,
        {
          replacements: [roomId, userId],
          type: sequelize.QueryTypes.DELETE,
          transaction,
        },
      );
      await transaction.commit();
      return { status: true, message: 'Successfully deleted!' };
    } catch (error) {
      await transaction.rollback();
      let message = `Không thành công`;
      return { status: false, error, message };
    }
  }

  async createRoomMembers(roomId: number, memberIds: number[]) {
    const time = new Date().getTime();
    const transaction = await this.sequelize.transaction();
    const content = '';
    const msg_type = 'JOIN_ROOM';
    try {
      for (let i = 0; i < memberIds.length; i++) {
        await this.sequelize.query(
          `
                    INSERT INTO participants (room_id, user_id, time) 
                    VALUES (?, ?, ?)
                `,
          {
            replacements: [roomId, memberIds[i], time],
            type: sequelize.QueryTypes.INSERT,
            transaction,
          },
        );

        await this.sequelize.query(
          `
                INSERT INTO messages (room_id, user_id, content, time, type)
                VALUES (?,?,?,?,?)
            `,
          {
            replacements: [roomId, memberIds[i], content, time, msg_type],
            type: sequelize.QueryTypes.INSERT,
            transaction,
          },
        );
      }
      await transaction.commit();
      return { status: true, message: 'Successfully modified!' };
    } catch (error) {
      await transaction.rollback();
      let message = `Không thành công`;
      return { status: false, error, message };
    }
  }
}
