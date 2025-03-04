import { Typography } from "@mui/material";

const ErrorMessage = ({ message }) => {
  return message ? <Typography color="error">{message}</Typography> : null;
};

export default ErrorMessage;
