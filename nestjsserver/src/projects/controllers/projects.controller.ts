import { UpdateProjectDto } from '../dto/update.project.dto';
import { Controller, Post, Get, Delete, Param, Body, HttpStatus, Query, Put, UsePipes, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create.project.dto';
import { ProjectsService } from '../services/projects.service';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { SanitizePipe } from '../../pipes/sanitize.pipe';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { AuthGuard } from '../../guards/auth.guard';

@ApiUseTags('projects')
@Controller('projects')
export class ProjectsController {
  public constructor(
    private readonly projectsService: ProjectsService,
  ) { }

  @Get()
  @ApiOperation({ title: 'Get list of projects' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return list of projects' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiImplicitQuery({ required: false, name: 'order', enum: ['abc', 'cba'] })
  @ApiImplicitQuery({ required: false, name: 'page' })
  @ApiImplicitQuery({ required: false, name: 'limit' })
  @ApiImplicitQuery({ required: false, name: 'sort' })
  public async findAll(
    @Query() queryParams: { page: number, limit: number, order: string, sort: string },
  ) {
    return await this.projectsService.findAll(queryParams);
  }

  @Post()
  @ApiOperation({ title: 'Create new project' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return new created project' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe, SanitizePipe)
  public async create(
    @Body() command: CreateProjectDto,
  ) {
    return await this.projectsService.create(command);
  }

  @Get(':id')
  @ApiOperation({ title: 'Find project' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  public async findOne(@Param('id') id: string) {
    return await this.projectsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update project' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return updated project' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe, SanitizePipe)
  public async updateOne(
    @Param('id') id: string,
    @Body() command: UpdateProjectDto,
  ) {
    return await this.projectsService.updateOne(id, command);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete project' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return ok' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  public async deleteOne(@Param('id') id: string) {
    return await this.projectsService.deleteOne(id);
  }
}
