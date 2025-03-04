import { Button, CircularProgress } from "@mui/material";

const GenerateButton = ({ onClick, disabled, loading }) => {
  return (
    <Button variant="contained" fullWidth onClick={onClick} disabled={disabled}>
      {loading ? <CircularProgress size={24} /> : "Generate Reply"}
    </Button>
  );
};

export default GenerateButton;
