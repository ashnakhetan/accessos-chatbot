import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const SelectionMessage = ({ content, onSelect }) => {
  return (
    <Grid container>
      <Button onClick={onSelect}>{content}</Button>
    </Grid>
  );
};
