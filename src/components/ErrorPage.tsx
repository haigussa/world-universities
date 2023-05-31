import { Alert, Box } from "@mui/material";

const ErrorPage: React.FC = (): JSX.Element => {
  return (
    <Box
      sx={{
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Alert
        severity="error"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        Oops.... Sorry something went wrong; please try again later!
      </Alert>
    </Box>
  );
};

export default ErrorPage;
