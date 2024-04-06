import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const InputBar = ({ placeholder, onChange, onSubmit }) => {
  return (
    <Grid container>
      <input placeholder={placeholder} onChange={onChange} />
      <Button
        onClick={onSubmit}
        startIcon={<SendIcon style={{ color: "#007bff" }} />}
      >
        Send
      </Button>
    </Grid>
  );
};
export default InputBar;
