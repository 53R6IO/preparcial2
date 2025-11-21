import { IsISO8601, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTravelPlanDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  countryCode: string;

  @IsNotEmpty()
  @IsISO8601()
  startDate: string;

  @IsNotEmpty()
  @IsISO8601()
  endDate: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
