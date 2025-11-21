import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TravelPlan extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  countryCode: string; // alpha-3

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  notes?: string;

  // timestamps added by Mongoose
  createdAt?: Date;
  updatedAt?: Date;
}

export const TravelPlanSchema = SchemaFactory.createForClass(TravelPlan);
