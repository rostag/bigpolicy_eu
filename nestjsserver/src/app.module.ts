import { ProjectsModule } from './projects/projects.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './filters/exceptionsFilter.filter';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

// TODO: to config
@Module({
  imports: [TypeOrmModule.forRoot({
    useNewUrlParser: true,
    type: 'mongodb',
    host: 'localhost',
    database: 'test',
    entities: ['src/**/**.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
  }), ProjectsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule { }
