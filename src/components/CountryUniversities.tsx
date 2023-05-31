import { Container, Typography, } from "@mui/material";
import { DataGrid, GridRowsProp, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport, } from "@mui/x-data-grid";
import { useEffect, Dispatch, SetStateAction, useContext, useState, } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CountryContext, FetchDataResult } from "../CountryContext";
import SearchForm from "./SearchForm";
import { universitycolumns as columns } from "../config/universityColumns";

type CountryDetailsProps = {
  rows: GridRowsProp;
  // allData: GridRowsProp;
  setSelectedCountry: Dispatch<SetStateAction<string | undefined>>;
};

export default function CountryUniversities({
  rows,
  setSelectedCountry,
}: CountryDetailsProps): JSX.Element {
  const [searchResult, setSearchResult] = useState<GridRowsProp>([]);

  const contextValue = useContext<FetchDataResult | undefined>(CountryContext);
  let { data } = contextValue || { data: [] };
  const allData = data;

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
    <Container style={{ height: "75vh", width: "100%" }}>
          {countryCode && rows[0]?.country && (
        <>
          <Typography variant="h4" gutterBottom>
            {rows[0].country}
          </Typography>

          <SearchForm setSearchResult={setSearchResult} searchCountries={false} label="Search University..."/>
          <DataGrid 
            getRowHeight={() => "auto"}
            getRowId={(row) => row.name}
            rows={searchResult[0]?.country? searchResult : rows}
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
        </>
      )}
    </Container>
  );
}