import { Grid, Typography } from "@mui/material";
import Selection from "./Selection";

const SelectionGroupMessage = ({ content, onSelect }) => {
  console.log("SelectionGroupMessage content:", content);
  return (
    <Grid container display="flex" flexDirection="row">
      {Array.isArray(content) &&
        content.map((selection, index) => (
          <Grid item>
            <Selection
              key={index}
              emoji={selection.emoji}
              text={selection.text}
              onSelect={onSelect}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default SelectionGroupMessage;
