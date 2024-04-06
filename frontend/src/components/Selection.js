import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const Selection = ({ emoji, text, onSelect }) => {
  return (
    <Grid container>
      <Button onClick={() => onSelect(emoji, text)}>{(emoji, text)}</Button>
    </Grid>
  );
};

export default Selection;
