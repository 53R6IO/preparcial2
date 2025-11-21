import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Country extends Document {
  @Prop({ unique: true })
  code: string;

  @Prop()
  name: string;

  @Prop()
  region: string;

  @Prop()
  subregion: string;

  @Prop()
  capital?: string;

  @Prop()
  population?: number;

  @Prop()
  flag?: string;

  // timestamps provided by Mongoose when Schema({ timestamps: true }) is used
  createdAt?: Date;
  updatedAt?: Date;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
