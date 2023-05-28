import { Button, Container, Typography } from "@mui/material";
import useFetchData from "./hooks/useFetchData";
import { useState } from "react";
import { getUniqueCountries } from "./utils";
import CountryGrid from "./components/CountryGrid";
import CountryDetails from "./components/CountryDetails";
import { Routes, Route, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CountryDetail } from "./types";
import Loading from "./components/Loading";
import ErrorPage from "./components/ErrorPage";

const App: React.FC = ():JSX.Element => {
  const { data, error, loading } = useFetchData(
    "http://universities.hipolabs.com/search"
  );
  const [filteredData, setFilteredData] = useState<CountryDetail>([]);
  const [, setSelectedCountry] = useState<string | undefined>();

  const filterCountries = (countryCode: string | undefined) => {
    const filtered: CountryDetail = data.filter(
      (row) => countryCode === row["alpha_two_code"]
    );
    setFilteredData(filtered);
  };
  const navigate = useNavigate();

  const handleCountrySelect = (row: any) => {
    setSelectedCountry(row);
    filterCountries(row);
    navigate(`${row?.toLowerCase()}`);
  };

  const uniqueCountries = getUniqueCountries(data);

  return (
    <Container>
      {!error ? (
        <>
          <Button onClick={() => navigate(-1)}>
            <ArrowBackIcon /> Back
          </Button>
          <Typography variant="h3" gutterBottom align="center">
            World Universities
          </Typography>

          {!loading ? (
            <Routes>
              <Route
                path="/:countryCode"
                element={
                  <CountryDetails
                    setSelectedCountry={setSelectedCountry}
                    rows={filteredData}
                    allData={data}
                    // setFilteredData={setFilteredData}
                  />
                }
              />
              <Route
                index
                path="/"
                element={
                  <CountryGrid
                    rows={uniqueCountries}
                    handleCountrySelect={handleCountrySelect}
                  />
                }
              />
            </Routes>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <>
          <ErrorPage />
        </>
      )}
    </Container>
  );
};

export default App;
