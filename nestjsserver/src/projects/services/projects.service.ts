import { CreateProjectDto } from '../dto/create.project.dto';
import { Project } from '../entities/project.entity';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { UpdateProjectDto } from '../dto/update.project.dto';

// TODO: connect to DB
@Injectable()
export class ProjectsService {
  private projects: Project[] = [];

  public async findAll(query: any): Promise<Project[]> {
    return Promise.resolve(this.projects);
  }

  public async create(command: CreateProjectDto): Promise<Project> {
    const newProject: Project = { ...command, id: this.projects.length };
    this.projects.push(newProject);
    return Promise.resolve(newProject);
  }

  public async findOne(id: number): Promise<Project> {
    const project: Project | undefined = this.projects.find((item: Project) => item.id === id);
    if (!project) {
      throw new ForbiddenException('Can not find project by id');
    }
    return Promise.resolve(project);
  }

  public async updateOne(id: number, command: UpdateProjectDto): Promise<Project> {
    const index: number = this.projects.findIndex((item: Project) => item.id === id);
    if (index === -1) {
      throw new ForbiddenException('Can not find project by id');
    }
    const updatedProject: Project = { ...this.projects[index], ...command };
    this.projects.splice(index, 1, updatedProject);
    return Promise.resolve(updatedProject);
  }

  public async deleteOne(id: number): Promise<{ id: number }> {
    const index: number = this.projects.findIndex((item: Project) => item.id === id);
    if (index === -1) {
      throw new ForbiddenException('Can not find project by id');
    }
    this.projects.splice(index, 1);
    return Promise.resolve({ id: index });
  }
}
