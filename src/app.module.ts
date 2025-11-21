import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://sergioaugup2005_db_user:parcial2@cluster0.ldvxxym.mongodb.net/backdb?appName=Cluster0')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
