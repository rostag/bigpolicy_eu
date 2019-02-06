import { CreateLeaderDto } from '../dto/create.leader.dto';
import { Leader } from '../entities/leader.entity';
import { Injectable } from '@nestjs/common';
import { UpdateLeaderDto } from '../dto/update.leader.dto';
import { Repository  } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as mongodb from 'mongodb';

// TODO: make data access layer
@Injectable()
export class LeadersService {
  public constructor(
    @InjectRepository(Leader)
    private readonly leaderRepository: Repository<Leader>,
  ) { }

  public async findAll(queryParams: any): Promise<Leader[]> {
    return await this.leaderRepository.find();
  }

  public async create(command: CreateLeaderDto): Promise<Leader> {
    return await this.leaderRepository.save(command);
  }

  public async findOne(id: string): Promise<Leader> {
    return await this.leaderRepository.findOne(new mongodb.ObjectID(id));
  }

  public async updateOne(id: string, command: UpdateLeaderDto): Promise<any> {
    await this.leaderRepository.update({ id: new mongodb.ObjectID(id) }, command);
    return this.findOne(id);
  }

  public async deleteOne(id: string): Promise<{id: string}> {
    await this.leaderRepository.delete({ id: new mongodb.ObjectID(id) });
    return {id};
  }
}
