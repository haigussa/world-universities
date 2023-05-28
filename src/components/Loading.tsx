import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100%",
        minHeight: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
