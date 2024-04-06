import { Grid, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send"; // Import the send icon

const InputBar = ({ placeholder, onSubmit }) => {
  return (
    <Grid container alignItems="center">
      <input placeholder={placeholder} />
      <IconButton onClick={onSubmit} color="primary">
        <SendIcon />
      </IconButton>
    </Grid>
  );
};

export default InputBar;
