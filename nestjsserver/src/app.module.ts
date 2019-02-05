import { LeadersModule } from './leaders/leaders.module';
import { CheckJwtMiddleware } from './core/authorization/check.jwt.middleware';
import { ProjectsModule } from './projects/projects.module';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
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
  }), ProjectsModule, LeadersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CheckJwtMiddleware)
      .forRoutes(
        { path: 'leaders', method: RequestMethod.POST },
      );
  }
}
