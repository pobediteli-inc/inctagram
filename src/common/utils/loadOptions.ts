import { City, Country } from "country-state-city";
import { SelectItems } from "common/types";

export const loadCountries =
  () =>
  async (inputValue: string): Promise<SelectItems[]> => {
    const countries = Country.getAllCountries();

    const filtered = inputValue
      ? countries.filter((c) => c.name.toLowerCase().includes(inputValue.toLowerCase()))
      : countries;

    return filtered.map((c) => ({
      label: c.name,
      value: c.isoCode,
    }));
  };

export const loadCities =
  (countryCode?: string) =>
  async (inputValue: string): Promise<SelectItems[]> => {
    if (!countryCode) return [];

    const allCities = City.getCitiesOfCountry(countryCode) ?? [];

    const filtered = inputValue
      ? allCities.filter((c) => c.name.toLowerCase().includes(inputValue.toLowerCase()))
      : allCities;

    return filtered.map((c) => ({
      label: c.name,
      value: `${c.name}-${c.stateCode}`,
    }));
  };
