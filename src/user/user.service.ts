import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Document, DocumentType } from './schemas/document.schema';
import { AddUserDto } from './dto/add-user.dto';
import { AddDocumentDto } from './dto/add-document.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Document.name) private documentModel: Model<DocumentType>,
  ) {}

  async findByName(name: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ name }).exec();
  }

  async addUser(userData: AddUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async getUserDocuments(userId: string): Promise<DocumentType[]> {
    const user = await this.userModel.findById(userId).populate('documents');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.documents as DocumentType[];
  }

  async addDocumentToUser(userId: string, documentData: AddDocumentDto): Promise<DocumentType> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newDocument = new this.documentModel(documentData);
    const savedDocument = await newDocument.save();

    user.documents.push(savedDocument._id);
    await user.save();

    return savedDocument;
  }

  async updateDocumentStatus(documentId: string, statusData: UpdateStatusDto): Promise<DocumentType> {
    const document = await this.documentModel.findByIdAndUpdate(documentId, statusData, { new: true });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async deleteDocument(documentId: string): Promise<void> {
    const document = await this.documentModel.findByIdAndDelete(documentId);
    if (!document) {
      throw new NotFoundException('Document not found');
    }
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.documentModel.deleteMany({ _id: { $in: user.documents } });
  }
}
