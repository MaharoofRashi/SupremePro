import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { AddUserDto } from './dto/add-user.dto';
import { AddDocumentDto } from './dto/add-document.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(@Body() userData: AddUserDto): Promise<User> {
    return this.userService.addUser(userData);
  }

  @Get(':id/documents')
  async getUserDocuments(@Param('id') userId: string) {
    return this.userService.getUserDocuments(userId);
  }

  @Post(':id/documents')
  async addDocumentToUser(@Param('id') userId: string, @Body() documentData: AddDocumentDto) {
    return this.userService.addDocumentToUser(userId, documentData);
  }

  @Patch('documents/:documentId/status')
  async updateDocumentStatus(@Param('documentId') documentId: string, @Body() statusData: UpdateStatusDto) {
    return this.userService.updateDocumentStatus(documentId, statusData);
  }

  @Delete('documents/:documentId')
  async deleteDocument(@Param('documentId') documentId: string) {
    return this.userService.deleteDocument(documentId);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
