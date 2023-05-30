import {
  DataGrid, GridRowsProp, GridColDef, GridToolbarContainer,
  GridToolbarFilterButton, GridToolbarExport, } from "@mui/x-data-grid";
import { useState } from "react";
import SearchForm from "./SearchForm";

const columns: GridColDef[] = [
  { field: "countryCode", headerName: "Country Code", flex: 1 },
  { field: "country", headerName: "Country", flex: 1 },
];

type CountryGridProps = {
  rows: GridRowsProp;
  handleCountrySelect: (
    e: React.ChangeEvent<{ value: string | undefined }>
  ) => void;
};

export default function CountryGrid({
  rows,
  handleCountrySelect,
}: CountryGridProps): JSX.Element {
  const [searchResult, setSearchResult] = useState<GridRowsProp>([]);
  const [totalSearchResult, setTotalSearchResult] = useState(0)

  const handleFilterCountries = (searchTerm:string |undefined):void => {
    let filteredSearchResult: GridRowsProp | [] 
    filteredSearchResult = []
    setTotalSearchResult(_=> 0)
    console.log("searchResult.length 1", totalSearchResult)
    filteredSearchResult= rows.filter((row) =>
      row.country.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    console.log(filteredSearchResult);
    // if (filteredSearchResult.length){ 
      setSearchResult(_=>filteredSearchResult)
    // };
      setTotalSearchResult(_ => filteredSearchResult.length)
      console.log("searchResult.length 2", totalSearchResult)

  };
  console.log(searchResult.length)
  return (
    <div style={{ height: "75vh", width: "100%" }}>
      <SearchForm handleFilterCountries={handleFilterCountries} totalSearchResult={totalSearchResult} setSearchResult={setSearchResult}/>
      <DataGrid
        onRowClick={(row) =>
          handleCountrySelect(row.row.countryCode.toString())
        }
        rows={searchResult.length ? searchResult : rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[10, 15, 30]}
        components={{
          Toolbar: () => (
            <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
              <GridToolbarFilterButton />
              <GridToolbarExport />
            </GridToolbarContainer>
          ),
        }}
      />
    </div>
  );
}
