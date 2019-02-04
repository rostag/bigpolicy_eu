import { ProjectsModule } from './projects/projects.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './filters/exceptionsFilter.filter';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, ProjectsModule],
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
