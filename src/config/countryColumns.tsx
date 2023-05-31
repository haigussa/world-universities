import { GridColDef } from "@mui/x-data-grid";

export const countryColumns: GridColDef[] = [
	{ field: "countryCode", headerName: "Country Code", flex: 1 },
	{ field: "country", headerName: "Country", flex: 1 },
  ];