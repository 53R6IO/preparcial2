import { Injectable } from '@nestjs/common';
import { CountryProvider } from '../interfaces/country-provider.interface';

@Injectable()
export class RestCountriesProvider implements CountryProvider {
  async getByAlpha3(code: string) {
    try {
      const url = `https://restcountries.com/v3.1/alpha/${code}?fields=cca3,name,region,subregion,capital,population,flags`;
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      const c = Array.isArray(data) ? data[0] : data;
      if (!c) return null;
      return {
        code: c.cca3,
        name: c.name?.common ?? c.name,
        region: c.region,
        subregion: c.subregion,
        capital: Array.isArray(c.capital) ? c.capital[0] : c.capital,
        population: c.population,
        flag: c.flags?.png ?? c.flags?.svg,
      };
    } catch (error) {
      return null;
    }
  }
}
