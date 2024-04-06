import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const InputBar = ({ placeholder, onChange, onSubmit }) => {
  return (
    <Grid container>
      <input placeholder={placeholder} onChange={onChange} />
      <Button onClick={onSubmit}>Submit</Button>
    </Grid>
  );
};

// make this prettier:
// make the submit button a send icon
// This is the modification I did.

export default InputBar;
