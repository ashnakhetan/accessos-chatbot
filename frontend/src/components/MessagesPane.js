import { Grid } from "@mui/material";
import Message from "./Message";
import SelectionGroupMessage from "./SelectionGroupMessage";

const MessagesPane = ({ messages, onSelect }) => {
  return (
    <Grid container>
      {messages.map((message, index) =>
        message.type === "text" ? (
          <Message
            key={index}
            sender={message.sender}
            content={message.content}
          />
        ) : (
          <SelectionGroupMessage
            key={index}
            content={message.content}
            onSelect={onSelect}
          />
        )
      )}
    </Grid>
  );
};

export default MessagesPane;
