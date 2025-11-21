import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country as CountryClass } from './schemas/country.schema';
import type { Country } from './schemas/country.schema';
import type { CountryProvider } from './interfaces/country-provider.interface';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(CountryClass.name) private countryModel: Model<Country>,
    @Inject('CountryProvider') private provider: CountryProvider,
  ) {}

  async findAll(): Promise<any[]> {
    const countries = await this.countryModel.find().lean();
    if (countries.length > 0) return countries;

    // If DB is empty, fetch list from external REST API and seed DB
    try {
      const url =
        'https://restcountries.com/v3.1/all?fields=cca3,name,region,subregion,capital,population,flags';
      const res = await fetch(url);
      if (!res.ok) return [];
      const data = await res.json();
      const mapped = Array.isArray(data)
        ? data.map((c) => ({
            code: c.cca3,
            name: c.name?.common ?? c.name,
            region: c.region,
            subregion: c.subregion,
            capital: Array.isArray(c.capital) ? c.capital[0] : c.capital,
            population: c.population,
            flag: c.flags?.png ?? c.flags?.svg,
          }))
        : [];

      if (mapped.length === 0) return [];
      await this.countryModel.insertMany(mapped);
      return this.countryModel.find().lean();
    } catch (error) {
      return [];
    }
  }

  async findByCode(code: string): Promise<{ country: any; source: 'local' | 'external' }> {
    const codeUpper = code.toUpperCase();
    const found = await this.countryModel.findOne({ code: codeUpper }).lean();
    if (found) return { country: found, source: 'local' };

    const fromApi = await this.provider.getByAlpha3(codeUpper);
    if (!fromApi) throw new NotFoundException(`Country ${code} not found`);

    const created = await this.countryModel.create({
      code: fromApi.code,
      name: fromApi.name,
      region: fromApi.region,
      subregion: fromApi.subregion,
      capital: fromApi.capital,
      population: fromApi.population,
      flag: fromApi.flag,
    });

    return { country: created.toObject(), source: 'external' };
  }
}
