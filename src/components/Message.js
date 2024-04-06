import { Grid, Typography } from "@mui/material";

const Message = ({ sender, content }) => {
  const bubbleColor = sender === "user" ? "green" : "lightgray";
  const bubbleSide = sender === "user" ? "right" : "left";
  const textColor = sender === "user" ? "white" : "black";

  return (
    <Grid
      container
      display={"flex"}
      direction={"row"}
      justifyContent={bubbleSide}
      p="20px"
      sx={{}}
    >
      <Grid
        item
        sx={{ backgroundColor: bubbleColor, p: "10px", borderRadius: 30 }}
      >
        <Typography color={textColor}>{content}</Typography>
      </Grid>
    </Grid>
  );
};

export default Message;
