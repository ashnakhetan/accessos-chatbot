import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const Selection = ({ emoji, text, onSelect, type }) => {
  return (
    <Grid container>
      <Button onClick={() => onSelect(emoji, text, type)}>
        {emoji ? (
          <Typography variant="h5">
            {emoji} {text}
          </Typography>
        ) : (
          <Typography variant="h5">{text}</Typography>
        )}
      </Button>
    </Grid>
  );
};

export default Selection;
