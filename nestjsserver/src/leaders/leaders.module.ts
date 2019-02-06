import { Leader } from './entities/leader.entity';
import { Module } from '@nestjs/common';
import { LeadersController } from './controllers/leaders.controller';
import { LeadersService } from './services/leaders.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Leader])],
  controllers: [LeadersController],
  providers: [LeadersService],
})
export class LeadersModule { }
