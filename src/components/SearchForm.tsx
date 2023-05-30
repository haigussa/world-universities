import { Box, Button, TextField, Typography } from "@mui/material";
import { GridValidRowModel } from "@mui/x-data-grid";
import { FormEvent, useState } from "react";

type FormProps = {
  handleFilterCountries: (searchTerm: string | undefined) => void;
  totalSearchResult: number | undefined;
  setSearchResult: React.Dispatch<React.SetStateAction<readonly GridValidRowModel[]>>
};

const SearchForm: React.FC<FormProps> = ({
  handleFilterCountries,
  totalSearchResult,
  setSearchResult
}): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string >("");
  const [displaySearchResult, setDisplaySearchResult] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
	let timer
	if(searchTerm?.length< 2){
		setDisplaySearchResult(false)
		alert('Your search term should be at least 2 characters')
		return
	}
	if(timer) clearTimeout(timer)
    handleFilterCountries(searchTerm);
    setDisplaySearchResult(true);
     timer = setTimeout(() => {
      setDisplaySearchResult(false);
    }, 3000);
  };

  const handleResetSearch =()=>{
	setSearchResult([])
	setSearchTerm("")

  }

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

        <Button sx={{ flex: 1 }}>Search</Button>
      </form>
      <Typography sx={{ font: "caption", mt: 2, mb: 2, textAlign: "center" }}>
        {" "}
        {displaySearchResult && `Found ${totalSearchResult} possible matches`}
      </Typography>
	  <Button onClick={handleResetSearch}>Reset Search</Button>
    </Box>
  );
};

export default SearchForm;
