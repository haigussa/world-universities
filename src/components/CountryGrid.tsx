import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { tableStyles } from "../utils";

const columns: GridColDef[] = [
  { field: "countryCode", headerName: "Country Code", flex: 1 },
  { field: "country", headerName: "Country", flex: 1 },
];
export default function CountryGrid({
  rows,
  handleCountrySelect,
}: {
  rows: GridRowsProp;
  handleCountrySelect: (e: React.ChangeEvent<{ value: string|undefined }>) => void;
}) {
  //   const handleEvent: GridEventListener<"rowClick"> = (
  //     params, // GridRowParams
  //     event, // MuiEvent<React.MouseEvent<HTMLElement>>
  //     details // GridCallbackDetails
  //   ) => {
  // 	console.log(e)
  //     console.log(`Movie "${params.row.countryCode}" clicked`);
  //     console.log('child', params.row.countryCode);
  // 	handleCountrySelect(params.row.countryCode)
  //   };

  return (
    <div style={{ height: "75vh", width: "100%" }}>
      <DataGrid
        onRowClick={(row) => handleCountrySelect(row.row.countryCode.toString())}
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
