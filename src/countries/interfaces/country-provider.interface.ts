export interface CountryProvider {
  getByAlpha3(code: string): Promise<{
    code: string;
    name: string;
    region?: string;
    subregion?: string;
    capital?: string;
    population?: number;
    flag?: string;
  } | null>;
}
