import "./App.css";
import Message from "./components/Message";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InputBar from "./components/InputBar";
import Selection from "./components/Selection";
import MessagesPane from "./components/MessagesPane";

function App() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === "user"
    ) {
      getChatbotResponse();
    }
  }, [messages]);

  const onMessageSubmit = (e) => {
    const currentUserMessage = {
      sender: "user",
      content: userMessage,
    };
    setMessages([...messages, currentUserMessage]);
  };

  const onSelect = (emoji, text) => {
    // add this as a user message
    const currentUserMessage = {
      sender: "user",
      emoji: emoji,
      content: text,
    };
    setMessages([...messages, currentUserMessage]);
  };

  const getChatbotResponse = (userMessage) => {
    // logic to get the correct response, given the most recent message
    const response = "Sample chatbot response";
    const currentChatbotResponse = {
      sender: "chatbot",
      content: response,
      type: "message", // or "selection"
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
        <MessagesPane messages={messages} />
        {/* <Selection> */}
        <Selection emoji="🚨" text="Emergency" onSelect={onSelect} />
        {/* <Selection emoji="🍕" text="Food" onSelect={onSelect} /> */}
        <Selection emoji="🚑" text="Medical" onSelect={onSelect} />
        <Selection emoji="🔥" text="Fire" onSelect={onSelect} />
        <Selection emoji="🚔" text="Police" onSelect={onSelect} />
        {/* </Selection> */}
      </Grid>
      <Grid item>
        <InputBar
          placeholder="Use this to provide us textual details, if you can"
          onSubmit={onMessageSubmit}
          // onChange={onInputChange}
          onChange={(e) => setUserMessage(e.target.value)}
        />
      </Grid>
    </Grid>
  );
}

export default App;
