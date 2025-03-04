import { TextField, Button, Box, Typography } from "@mui/material";

const GeneratedReply = ({ reply }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Generated Reply:
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        value={reply}
        inputProps={{ readOnly: true }}
      />
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => navigator.clipboard.writeText(reply)}
      >
        Copy to Clipboard
      </Button>
    </Box>
  );
};

export default GeneratedReply;
