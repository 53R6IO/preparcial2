import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schema';
import { TravelPlan, TravelPlanSchema } from '../travel-plans/schemas/travel-plan.schema';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { RestCountriesProvider } from './providers/rest-countries.provider';
import { DeleteAuthGuard } from './guards/delete-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Country.name, schema: CountrySchema },
      { name: TravelPlan.name, schema: TravelPlanSchema },
    ]),
  ],
  controllers: [CountriesController],
  providers: [
    CountriesService,
    { provide: 'CountryProvider', useClass: RestCountriesProvider },
    RestCountriesProvider,
    // guard
    DeleteAuthGuard,
  ],
  exports: [CountriesService],
})
export class CountriesModule {}
