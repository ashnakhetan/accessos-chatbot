import { Grid } from "@mui/material";
import Message from "./Message";

const MessagesPane = ({ messages }) => {
  return (
    <Grid container>
      {messages.map((message, index) => (
        <Message
          key={index}
          sender={message.sender}
          content={message.content}
        />
      ))}
    </Grid>
  );
};

export default MessagesPane;
