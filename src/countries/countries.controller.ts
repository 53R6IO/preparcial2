import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { DeleteAuthGuard } from './guards/delete-auth.guard';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async findAll() {
    const countries = await this.countriesService.findAll();
    return countries.map((c) => ({
      code: c.code,
      name: c.name,
      region: c.region,
      subregion: c.subregion,
      capital: c.capital,
      population: c.population,
      flag: c.flag,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));
  }

  @Get(':code')
  async findByCode(@Param('code') code: string) {
    const { country, source } = await this.countriesService.findByCode(code);
    return {
      source,
      country: {
        code: country.code,
        name: country.name,
        region: country.region,
        subregion: country.subregion,
        capital: country.capital,
        population: country.population,
        flag: country.flag,
        createdAt: country.createdAt,
        updatedAt: country.updatedAt,
      },
    };
  }

  @Delete(':code')
  @UseGuards(DeleteAuthGuard)
  async deleteByCode(@Param('code') code: string) {
    return this.countriesService.deleteByCode(code);
  }
}
