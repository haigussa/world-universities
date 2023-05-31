import { Button, Container, CssBaseline, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useState } from "react";
import CountryList from "./components/CountryList";
import { Routes, Route, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CountryDetailTypes } from "./types";
import Loading from "./components/Loading";
import ErrorPage from "./components/ErrorPage";
import ThemeSwitch from "./components/ThemeSwitch";
import { CountryContext, FetchDataResult  } from "./CountryContext";
import CountryUniversities from "./components/CountryUniversities";

const App: React.FC = (): JSX.Element => {

  const countryContextValue = useContext<FetchDataResult | undefined>(CountryContext);
  const { data, error, loading } = countryContextValue || { data: [], error: false, loading: false }
  
  const [filteredData, setFilteredData] = useState<CountryDetailTypes>([]);
  const [, setSelectedCountry] = useState<string | undefined>();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const prevTheme = localStorage.getItem("theme");
    const updateTheme = prevTheme ? JSON.parse(prevTheme) : true;
    return updateTheme;
  });
  
  const handleThemeChange = () => {
    setIsDarkMode((prev: boolean) => {
      let currentPref = !prev;
      localStorage.setItem("theme", JSON.stringify(currentPref));
      return currentPref;
    });
  };

  const filterCountries = (countryCode: string | undefined) => {
    const filtered: CountryDetailTypes = data.filter(
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

  const theme = createTheme({
    palette: { mode: isDarkMode ? "dark" : "light" },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Container>
          <ThemeSwitch
            isDarkMode={isDarkMode}
            handleChange={handleThemeChange}
            />
          {!error ? (
            <>
              <CssBaseline />
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
                      <CountryUniversities
                        setSelectedCountry={setSelectedCountry}
                        rows={filteredData}
                        // allData={data}
                      />
                    }
                  />
                  <Route
                    index
                    path="/"
                    element={
                      <CountryList
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
    </ThemeProvider>
  );
};

export default App;
