import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TravelPlan as TravelPlanClass } from './schemas/travel-plan.schema';
import type { TravelPlan } from './schemas/travel-plan.schema';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectModel(TravelPlanClass.name) private travelModel: Model<TravelPlan>,
    private countriesService: CountriesService,
  ) {}

  async create(dto: CreateTravelPlanDto) {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    if (start > end) throw new BadRequestException('startDate must be before endDate');

    // Ensure country exists; this will use cache-first logic in CountriesService
    try {
      await this.countriesService.findByCode(dto.countryCode);
    } catch (e) {
      throw new NotFoundException('Associated country not found');
    }

    const created = await this.travelModel.create({
      title: dto.title,
      countryCode: dto.countryCode.toUpperCase(),
      startDate: start,
      endDate: end,
      notes: dto.notes,
    });

    return created.toObject();
  }

  async findAll() {
    return this.travelModel.find().lean();
  }

  async findOne(id: string) {
    return this.travelModel.findById(id).lean();
  }
}
