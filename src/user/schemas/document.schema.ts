import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

export type DocumentType = Document & MongooseDocument;

@Schema()
export class Document extends MongooseDocument {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    path: string;

    @Prop({ default: 'Pending' })
    status: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
