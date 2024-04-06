import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const InputBar = ({ placeholder, onSubmit }) => {
  return (
    <Grid container>
      <input placeholder={placeholder} />
      <Button onClick={onSubmit}>Submit</Button>
    </Grid>
  );
};

// make this prettier:
// make the submit button a send icon

export default InputBar;
