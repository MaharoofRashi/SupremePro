import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument, Types } from 'mongoose';
import { DocumentType } from './document.schema';

export type UserDocument = User & MongooseDocument;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string; // 'admin' or 'user'

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Document' }] })
  documents: DocumentType[];
}

export const UserSchema = SchemaFactory.createForClass(User);
