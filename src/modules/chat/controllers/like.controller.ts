import { Controller, Get, Param, Request, Post, Body, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { ChatService } from '../services/chat.service';
import { Request as RequestExpress } from 'express';
import { Delete } from '@nestjs/common/decorators';
import { LikeService } from '../services/like.service';

@Controller('likes')
@ApiTags('Like')
export class LikeController {
  constructor(private readonly service: LikeService) { }}
