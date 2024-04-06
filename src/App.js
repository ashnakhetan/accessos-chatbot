import "./App.css";
import Message from "./components/Message";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InputBar from "./components/InputBar";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getChatbotResponse();
  }, [messages]);

  const onMessageSubmit = (e) => {
    const currentUserMessage = {
      sender: "user",
      content: e.target.value,
    };
    setMessages([...messages, currentUserMessage]);
  };

  const getChatbotResponse = (userMessage) => {
    // logic to get the correct response, given the most recent message
    const response = "Sample chatbot response";
    const currentChatbotResponse = {
      sender: "chatbot",
      content: response,
    };
    setMessages([...messages, currentChatbotResponse]);
  };

  const sampleUserMessage = {
    sender: "user",
    content: "I am stuck in my basement and I can't get out!",
  };

  const sampleChatResponse = {
    sender: "chatbot",
    content: "Where are you located? I can send help your way.",
  };

  return (
    // one container
    // messages (indented)
    // input text bar at the bottom
    <Grid container direction="column" alignItems="center">
      <Grid
        container
        direction="column"
        alignItems="center"
        margin="auto"
        justifyContent="center"
        borderRadius={1}
        border={1}
        width="700px"
        sx={{ height: "80vh" }}
      >
        <Message
          sender={sampleUserMessage.sender}
          content={sampleUserMessage.content}
        />
        <Message
          sender={sampleChatResponse.sender}
          content={sampleChatResponse.content}
        />
      </Grid>
      <Grid item>
        <InputBar
          placeholder="Use this to provide us textual details, if you can"
          onSubmit={onMessageSubmit}
        />
      </Grid>
    </Grid>
  );
}

export default App;
