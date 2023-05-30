import {
  Container,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";
import { useEffect, Dispatch, SetStateAction } from "react";
import { useNavigate, useParams } from "react-router-dom";
const columns: GridColDef[] = [
  // { field: "alpha_two_code", headerName: "Country Code", flex: 1 },
  // { field: "country", headerName: "Country", flex: 2 },
  { field: "name", headerName: "University Name", align: "left", flex: 3 },
  { field: "state-province", headerName: "State\nProvince", flex: 1, filterable:false },
  {
    field: "domains",
    headerName: "Domains",
    filterable: false,
    flex: 2,
    renderCell: (params) => {
      return (
        <List dense>
          {params.row.domains.map((domain: string) => (
            <ListItem key={domain}>
              <Link href={domain} target="_blanck">
                {domain}
              </Link>
            </ListItem>
          ))}
        </List>
      );
    },
  },
  {
    field: "web_pages",
    headerName: "Web Pages",
    flex: 2,    
    filterable: false,
    renderCell: (params) => {
      return (
        <List dense={true}>
          {params.row.web_pages.map((site: string) => (
            <ListItemText key={site}>
              <Link href={site} target="_blank">
                {site}
              </Link>
            </ListItemText>
          ))}
        </List>
      );
    },
  },
];
type CountryDetailsProps = {
  rows: GridRowsProp;
  allData: GridRowsProp;
  setSelectedCountry: Dispatch<SetStateAction<string | undefined>>;
};
export default function CountryDetails({
  rows,
  allData,
  setSelectedCountry,
}: CountryDetailsProps): JSX.Element {
  const { countryCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!allData.length) {
      setSelectedCountry(countryCode?.toUpperCase());
      navigate("/");
    }
    setSelectedCountry(countryCode?.toUpperCase());
  }, [countryCode]);

  return (
    <Container style={{ height: "75vh", width: "100%"}}>
      {countryCode && rows[0]?.country && (
        <>
          <Typography variant="h4" gutterBottom>
            {rows[0].country}
          </Typography>
          <DataGrid
            getRowHeight={() => "auto"}
            getRowId={(row) => row.name}
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
            components={{Toolbar: ()=>(
              <GridToolbarContainer sx={{justifyContent: 'flex-end'}}>
                <GridToolbarFilterButton/>
                <GridToolbarExport/>
              </GridToolbarContainer>)}}
            
          />
        </>
      )}
    </Container>
  );
}