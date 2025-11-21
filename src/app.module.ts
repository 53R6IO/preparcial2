import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesModule } from './countries/countries.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';
import { AccessLogMiddleware } from './common/middleware/access-log.middelware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sergioaugup2005_db_user:parcial2@cluster0.ldvxxym.mongodb.net/backdb?appName=Cluster0'),
    CountriesModule,
    TravelPlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    
    consumer.apply(AccessLogMiddleware).forRoutes('*');
  }
}
