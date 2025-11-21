import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schema';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { RestCountriesProvider } from './providers/rest-countries.provider';

@Module({
  imports: [MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }])],
  controllers: [CountriesController],
  providers: [CountriesService, { provide: 'CountryProvider', useClass: RestCountriesProvider }, RestCountriesProvider],
  exports: [CountriesService],
})
export class CountriesModule {}
