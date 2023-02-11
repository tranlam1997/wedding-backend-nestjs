import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from '../message/models/message.model';
import sequelize, { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ChatService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Message) private readonly messageModel: typeof Message,
  ) {}

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
}
