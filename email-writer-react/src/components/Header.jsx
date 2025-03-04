import { Typography } from "@mui/material";

const Header = ({ title }) => {
  return (
    <Typography variant="h3" gutterBottom>
      {title}
    </Typography>
  );
};

export default Header;
