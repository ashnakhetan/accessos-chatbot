import { Grid, Typography, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const InputBar = ({ value, placeholder, onChange, onSubmit }) => {
  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      style={{ paddingLeft: "0px", width: "213%" }}
    >
      <Grid item style={{ width: "100%" }}>
        <TextField
          value={value}
          label={placeholder}
          variant="outlined"
          fullWidth
          onChange={onChange}
          sx={{ backgroundColor: "#f0f0f0" }} // Set background color here
          style={{ marginLeft: 0 }} // Set left margin to 0 to start at the very left
        />
      </Grid>
      <Grid item alignItems="right">
        <Button
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
          onClick={onSubmit}
          sx={{
            fontSize: "1rem",
            padding: "12px 24px",
            position: "relative",
            bottom: 0,
            left: 300,
          }}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

export default InputBar;
