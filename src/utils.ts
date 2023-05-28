import { CountryDetail } from "./types";
export const getUniqueCountries = (countryData: CountryDetail) => {
  let uniqueCountries = {};
  for (let entry of countryData) {
    if ((uniqueCountries as any)[entry["alpha_two_code"]]) continue;
    // uniqueCountries[entry['country']]= entry['country']
    (uniqueCountries as any)[entry["alpha_two_code"]] = entry["country"];
  }
  // return countryData.map(entry=>[entry['alpha_two_code'], entry['country']])
  let uniqueCountriesList = [];
  for (let key in uniqueCountries) {
    uniqueCountriesList.push([key, (uniqueCountries as any)[key]]);
  }
  // console.log('uniqueCountriesList', uniqueCountriesList)
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
  // console.log("sorted", formattedDataGridData);
  return formattedDataGridData;
};


export const tableStyles = {
  boxShadow: 2,
  border: 2,
  borderColor: '#ccc',
  maxWidth: 1200,
  margin: 'auto',
  '& .MuiDataGrid-cell:hover': {
    color: 'primary.main',
  },
  '& .MuiDataGrid-columnHeadersInner':{
    backgroundColor:'#E8E8E8',
    color: "#222831",
    border: '#222 solid 2px',
  },
  '& .MuiDataGrid-menuIconButton,.MuiDataGrid-sortIcon': {
    color:'#F05454',
    backgroundColor:'#30475E',
    borderRadius: '50%'

  }
 
}