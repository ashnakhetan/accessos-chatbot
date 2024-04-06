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
      getChatbotResponse(messages[messages.length - 1]);
    }
  }, [messages]);

  const onMessageSubmit = (e) => {
    const currentUserMessage = {
      sender: "user",
      content: userMessage,
    };
    setMessages([...messages, currentUserMessage]);
    setUserMessage("");
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

  const getChatbotResponse = async (userMessage) => {
    try {
      console.log("userMessage:", userMessage);
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      if (!response.ok) {
        console.log("response:", response);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Success:", data);
      const currentChatbotResponse = {
        sender: "chatbot",
        content: data.output.content.text, // Make sure this matches the structure of your response
        type: "message", // Assuming all responses are type "message" for simplicity
      };
      setMessages((prevMessages) => [...prevMessages, currentChatbotResponse]);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      // Here, handle the error based on your application's needs
    }
  };

  // const getChatbotResponse = async (userMessage) => {
  //   // logic to get the correct response, given the most recent message
  //   try {
  //     const response = await fetch("http://localhost:8000/", {
  //       method: "POST", // or 'GET', depending on API
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ message: userMessage }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log("Success:", data);
  //     const currentChatbotResponse = {
  //       sender: "chatbot",
  //       content: data.response, // Assuming the API returns the response text in `response` key
  //       type: "message", // or "selection"
  //     };
  //     setMessages((prevMessages) => [...prevMessages, currentChatbotResponse]);
  //   } catch (error) {
  //     console.error("There was a problem with your fetch operation:", error);
  //   }

  //   // const response = "Sample chatbot response";
  //   // const currentChatbotResponse = {
  //   //   sender: "chatbot",
  //   //   content: response,
  //   //   type: "message", // or "selection"
  //   // };
  //   // setMessages([...messages, currentChatbotResponse]);
  // };

  return (
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
        <MessagesPane messages={messages} />
        {/* <Selection> */}
        <Selection emoji="🚨" text="Emergency" onSelect={onSelect} />
        {/* <Selection emoji="🍕" text="Food" onSelect={onSelect} /> */}
        <Selection emoji="🚑" text="Medical" onSelect={onSelect} />
        <Selection emoji="🔥" text="Fire" onSelect={onSelect} />
        <Selection emoji="🚔" text="Police" onSelect={onSelect} />
        {/* </Selection> */}
      </Grid>
      <Grid item sx={{ position: "absolute", bottom: 50, left: 105 }}>
        <InputBar
          placeholder="Use this to provide us textual details, if you can"
          onSubmit={onMessageSubmit}
          onChange={(e) => setUserMessage(e.target.value)}
        />
      </Grid>
    </Grid>
  );
}

export default App;
