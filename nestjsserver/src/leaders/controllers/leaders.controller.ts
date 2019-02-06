import { UpdateLeaderDto } from '../dto/update.leader.dto';
import { Controller, Post, Get, Delete, Param, Body, HttpStatus, Query, Put, UsePipes, UseGuards } from '@nestjs/common';
import { CreateLeaderDto } from '../dto/create.leader.dto';
import { LeadersService } from '../services/leaders.service';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { SanitizePipe } from '../../pipes/sanitize.pipe';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { AuthGuard } from '../../guards/auth.guard';

@ApiUseTags('leaders')
@Controller('leaders')
export class LeadersController {
  public constructor(
    private readonly leadersService: LeadersService,
  ) { }

  // TODO: leader-api/page/:page/:limit/q/:dbQuery - copyed from express app, refactor
  @Get()
  @ApiOperation({ title: 'Get list of leaders' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return list of leaders' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiImplicitQuery({ required: false, name: 'order', enum: ['abc', 'cba'] })
  @ApiImplicitQuery({ required: false, name: 'page' })
  @ApiImplicitQuery({ required: false, name: 'limit' })
  @ApiImplicitQuery({ required: false, name: 'sort' })
  public async findAll(
    @Query() queryParams: { page: number, limit: number, order: string, sort: string },
  ) {
    return await this.leadersService.findAll(queryParams);
  }

  @Post()
  @ApiOperation({ title: 'Create new leader' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return new created leader' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe, SanitizePipe)
  public async create(
    @Body() command: CreateLeaderDto,
  ) {
    return await this.leadersService.create(command);
  }

  @Get(':id')
  @ApiOperation({ title: 'Find leader' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return leader' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  public async findOne(@Param('id') id: string) {
    return await this.leadersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update leader' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return updated leader' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe, SanitizePipe)
  public async updateOne(
    @Param('id') id: string,
    @Body() command: UpdateLeaderDto,
  ) {
    return await this.leadersService.updateOne(id, command);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete leader' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return ok' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  public async deleteOne(@Param('id') id: string) {
    return await this.leadersService.deleteOne(id);
  }
}
