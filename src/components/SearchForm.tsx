import { Box, Button,  TextField, Typography } from "@mui/material";
import { GridRowsProp, GridValidRowModel } from "@mui/x-data-grid";
import { FormEvent, MouseEvent, useContext, useState } from "react";
import { CountryContext, FetchDataResult } from "../CountryContext";
import { getUniqueCountries } from "../utils";
import { useParams } from "react-router-dom";

type FormProps = { setSearchResult: React.Dispatch< React.SetStateAction<readonly GridValidRowModel[]> >;
  searchCountries: boolean;
};

const SearchForm: React.FC<FormProps> = ({ setSearchResult, searchCountries, }): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displaySearchResult, setDisplaySearchResult] = useState(false);
  const [totalSearchResult, setTotalSearchResult] = useState(0);

  const contextValue = useContext<FetchDataResult | undefined>(CountryContext);
  const { data } = contextValue || { data: [] };

  const uniqueCountries = getUniqueCountries(data);
  const { countryCode } = useParams();

  const handleFilterCountries = (searchTerm: string): void => {
    let filteredSearchResult: GridRowsProp | [] = [];
    setTotalSearchResult((_) => 0);
    filteredSearchResult = uniqueCountries.filter((row) => {
      return row.country.toLowerCase().includes(searchTerm?.toLowerCase());
    });
    if (!searchCountries) {
      filteredSearchResult = data.filter((row) => {
        if (row.alpha_two_code.toLocaleLowerCase() === countryCode) {
          return row.name.toLowerCase().includes(searchTerm?.toLowerCase());
        }
      });
    }
    setSearchResult((_) => filteredSearchResult);
    setTotalSearchResult((_) => filteredSearchResult.length);
    console.log("searchResult.length 2", totalSearchResult);
    setSearchTerm("");
  };

  const handleSubmit = ( event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    let timer;
    if (searchTerm?.length < 2) {
      setDisplaySearchResult(false);
      alert("Your search term should be at least 2 characters");
      return;
    }
    if (timer) clearTimeout(timer);
    handleFilterCountries(searchTerm);
    setDisplaySearchResult(true);
    timer = setTimeout(() => {
      setDisplaySearchResult(false);
    }, 3000);
  };

  const handleResetSearch = () => {
    setSearchResult([]);
    setSearchTerm("");
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          margin: "auto",
          border: "1px solid #666",
        }}
      >
        <TextField
          fullWidth
          label="Search Country..."
          id="search-fiel"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 4 }}
        />

        <Button onClick={handleSubmit} sx={{ flex: 1 }}>
          Search
        </Button>
      </form>
      <Typography sx={{ font: "caption", mt: 2, mb: 2, textAlign: "center",  padding: 2, color:  totalSearchResult? 'green': 'crimson', maxWidth: 'fit-content', margin: 'auto'}}>
        {" "}
        {displaySearchResult && `Found ${totalSearchResult} possible matches`}
      </Typography>
      <Button onClick={handleResetSearch}>Reset Search</Button>
    </Box>
  );
};
export default SearchForm;
