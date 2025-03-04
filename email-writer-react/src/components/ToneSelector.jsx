import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ToneSelector = ({ value, onChange }) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Tone (Optional)</InputLabel>
      <Select value={value} onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        <MenuItem value="Professional">Professional</MenuItem>
        <MenuItem value="Casual">Casual</MenuItem>
        <MenuItem value="Friendly">Friendly</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ToneSelector;
