import { DataGrid, GridRowsProp, GridColDef, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport, } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import SearchForm from "./SearchForm";
import { CountryContext, FetchDataResult } from "../CountryContext";
import { getUniqueCountries } from "../utils";

const columns: GridColDef[] = [
  { field: "countryCode", headerName: "Country Code", flex: 1 },
  { field: "country", headerName: "Country", flex: 1 },
];

type CountryGridProps = {
  handleCountrySelect: (
    e: React.ChangeEvent<{ value: string | undefined }>
  ) => void;
};

export default function CountryList({
  handleCountrySelect,
}: CountryGridProps): JSX.Element {
  const [searchResult, setSearchResult] = useState<GridRowsProp>([]);

  const contextValue = useContext<FetchDataResult | undefined>(CountryContext);
  const { data } = contextValue || { data: [] };
 const uniqueCountries = getUniqueCountries(data);

  return (
    <div style={{ height: "75vh", width: "100%" }}>
      <SearchForm setSearchResult={setSearchResult} searchCountries={true} />
      <DataGrid
        onRowClick={(row) =>
          handleCountrySelect(row.row.countryCode.toString())
        }
        rows={searchResult.length ? searchResult : uniqueCountries}
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
