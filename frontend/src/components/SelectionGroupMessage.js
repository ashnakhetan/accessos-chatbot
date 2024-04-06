import { Grid, Typography } from "@mui/material";
import Selection from "./Selection";

const SelectionGroupMessage = ({ sender, content }) => {
  console.log("SelectionGroupMessage content:", content);
  return (
    <Grid item xs={12}>
      {Array.isArray(content) &&
        content.map((selection, index) => (
          <Selection
            key={index}
            sender={sender}
            emoji={selection.emoji}
            text={selection.text}
          />
        ))}
    </Grid>
  );
};

export default SelectionGroupMessage;
