import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { tableStyles } from "../utils";

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
}: CountryGridProps):JSX.Element {
  return (
    <div style={{ height: "75vh", width: "100%" }}>
      <DataGrid
        onRowClick={(row) =>
          handleCountrySelect(row.row.countryCode.toString())
        }
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[10, 15, 30]}
        // sx={{ height: "100%" }}
        sx={tableStyles}
      />
    </div>
  );
}
