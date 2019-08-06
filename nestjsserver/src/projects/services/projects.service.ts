import { CreateProjectDto } from '../dto/create.project.dto';
import { Project } from '../entities/project.entity';
import { Injectable } from '@nestjs/common';
import { UpdateProjectDto } from '../dto/update.project.dto';
import { Repository  } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as mongodb from 'mongodb';

// TODO: make data access layer
@Injectable()
export class ProjectsService {
  public constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) { }

  public async findAll(queryParams: any): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  public async create(command: CreateProjectDto): Promise<Project> {
    return await this.projectRepository.save(command);
  }

  public async findOne(id: string): Promise<Project> {
    return await this.projectRepository.findOne(new mongodb.ObjectID(id));
  }

  public async updateOne(id: string, command: UpdateProjectDto): Promise<any> {
    await this.projectRepository.update({ id: new mongodb.ObjectID(id) }, command);
    return this.findOne(id);
  }

  public async deleteOne(id: string): Promise<{id: string}> {
    await this.projectRepository.delete({ id: new mongodb.ObjectID(id) });
    return {id};
  }
}
