import { Grid, Typography } from "@mui/material";
import Selection from "./Selection";

const SelectionGroupMessage = ({ content, onSelect, type }) => {
  return (
    <Grid container display="flex" flexDirection="row" pl="20px" pt="0px">
      {Array.isArray(content) &&
        content.map((selection, index) => (
          <Grid item>
            <Selection
              key={index}
              emoji={selection.emoji}
              text={selection.text}
              onSelect={onSelect}
              type={type}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default SelectionGroupMessage;
