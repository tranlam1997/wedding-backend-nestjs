import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Attachment } from "./models/attachment.model";
import { EventAttachment } from "./models/event-attachment.model";
import { PlaceAttachment } from "./models/place-attachment.model";

@Injectable()
export class AttachmentService {
    constructor(
        @InjectModel(EventAttachment) private eventAttachmentModel: typeof EventAttachment,
        @InjectModel(PlaceAttachment) private placeAttachmentModel: typeof PlaceAttachment,
    ) { }

    async getEventAttachmentById(id: number) {
        const result = await this.eventAttachmentModel.findOne({
            where: {
                eventId: id,
            },
            include: [
                {
                    model: Attachment,
                    as: 'attachment',
                }
            ],
            attributes: ['id', 'filename', 'type', 'size']
        });
        return { error: false, data: result, message: "files list." };
    }

    async getPlaceAttachmentById(id: number) {
        const result = await this.placeAttachmentModel.findOne({
            where: {
                placeId: id,
            },
            include: [
                {
                    model: Attachment,
                    as: 'attachment',
                }
            ],
            attributes: ['id', 'filename', 'type', 'size']
        });
        return { error: false, data: result, message: "files list." };
    }
}