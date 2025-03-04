import { TextField } from "@mui/material";

const EmailInput = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      multiline
      rows={6}
      variant="outlined"
      label="Original Email Content"
      value={value}
      onChange={onChange}
      sx={{ mb: 2 }}
    />
  );
};

export default EmailInput;
