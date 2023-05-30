import { CountryDetailTypes } from './types/index';

export const getUniqueCountries = (countryData: CountryDetailTypes) => {
  let uniqueCountries = {};
  for (let entry of countryData) {
    if ((uniqueCountries as any)[entry["alpha_two_code"]]) continue;
    (uniqueCountries as any)[entry["alpha_two_code"]] = entry["country"];
  }
  let uniqueCountriesList = [];
  for (let key in uniqueCountries) {
    uniqueCountriesList.push([key, (uniqueCountries as any)[key]]);
  }
  let sortedUniqueCountries = uniqueCountriesList.sort((a, b) => {
    return a[0] > b[0] ? 1 : -1;
  });

  const formattedDataGridData = sortedUniqueCountries.map((uniqueCountry) => {
    return {
      id: uniqueCountry[0],
      countryCode: uniqueCountry[0],
      country: uniqueCountry[1],
    };
  });
  return formattedDataGridData;
};