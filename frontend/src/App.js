import "./App.css";
import Message from "./components/Message";
import { Grid, Typography, Box } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import InputBar from "./components/InputBar";
import MessagesPane from "./components/MessagesPane";
import questionsDict from "./questions";
import questionPrefixes from "./questionPrefixes";
import relevantQuestionsDict from "./relevantQuestions";

function App() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [detailsToRequest, setDetailsToRequest] = useState([
    "Address",
    "Type of Incident",
    "Details of Incident",
    "Weapon Involved",
  ]);
  const [infoToProvide911, setInfoToProvide911] = useState({
    "User Condition":
      "Person may be deaf, unable to communicate in English, or unable to speak.",
  }); // this is the only information we start off knowing
  const [message911Sent, setMessage911Sent] = useState(false);
  const [emergencyType, setEmergencyType] = useState(null); // ["Medical", "Fire", "Police", "Mental"
  const [currentQuestionsDict, setQuestionsDict] = useState(questionsDict);

  // once the initial message is sent to 911, we switch to the extra questions
  useEffect(() => {
    if (message911Sent) {
      setQuestionsDict(relevantQuestionsDict[emergencyType]);
    }
  }, [message911Sent]);

  useEffect(() => {
    if (currentQuestionsDict == relevantQuestionsDict[emergencyType]) {
      let keys = Object.keys(currentQuestionsDict);
      console.log("currentQuestionsDict[typeOfIncident] keys:", keys);
      setDetailsToRequest(keys);
    }
  }, [currentQuestionsDict]);

  // triggers the chatbot response every time the user sends a message
  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === "user"
    ) {
      getChatbotResponse(messages[messages.length - 1], detailsToRequest);
    }
  }, [messages]);

  // generates a chatbot response when we know what new detail to request
  useEffect(() => {
    if (detailsToRequest.length === 0 && !message911Sent) {
      // when all critical information acquired, print summary
      const formattedSummary = Object.entries(infoToProvide911)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");
      const currentChatbotResponses = [
        {
          sender: "chatbot",
          content: `You've provided all the information we need. Here is a summary: ${formattedSummary}`,
          type: "text",
        },
      ];

      currentChatbotResponses.push({
        sender: "chatbot",
        content:
          "Someone is on their way. You may continue to chat with us and provide more details, if you are able.",
        type: "text",
      });

      setMessages([...messages, ...currentChatbotResponses]);
      setMessage911Sent(true);
      console.log("have set message911Sent to true");
      return;
    }

    console.log("detailsToRequest:", detailsToRequest);
    const detail = detailsToRequest[0]; // pick the first detail that the chatbot needs to request
    console.log("detail:", detail);
    console.log("currentQuestionsDict:", currentQuestionsDict);
    console.log("curretn qdfsd", currentQuestionsDict[detail]);
    const question = currentQuestionsDict[detail].question;
    console.log("question:", question);
    const options = currentQuestionsDict[detail].options;
    console.log("options:", options);

    const randomPrefix = // add an appropriate message prefix
      messages.length < 2
        ? questionPrefixes.initial[
            Math.floor(Math.random() * questionPrefixes.initial.length)
          ]
        : questionPrefixes.subsequent[
            Math.floor(Math.random() * questionPrefixes.subsequent.length)
          ];

    // add the question and options as messages
    const currentChatbotResponses = [
      {
        sender: "chatbot",
        content: randomPrefix + " " + question,
        type: "text",
      },
    ];

    if (options != null) {
      currentChatbotResponses.push({
        sender: "chatbot",
        content: options,
        type: detail,
      });
    }
    setMessages([...messages, ...currentChatbotResponses]);
    return;
  }, [detailsToRequest]);

  // once all required information is obtained, we can send the information to the server (911 dispatch)
  useEffect(() => {
    if (detailsToRequest.length === 0) {
      // insert details here on how to send to 911! (you guys know best how you do this)
      setMessage911Sent(true);
    }
  }, [infoToProvide911]);

  const onMessageSubmit = (e) => {
    if (userMessage === "") {
      return;
    }
    const currentUserMessage = {
      sender: "user",
      content: userMessage,
      type: "text",
    };
    setMessages([...messages, currentUserMessage]);
    setUserMessage("");
  };

  const onSelect = (emoji, text, type) => {
    if (type === "Type of Incident") {
      setEmergencyType(text);
    }
    // when a user selects an option, adds this as a message
    const messagePrefix = currentQuestionsDict[type].messagePrefix;

    const currentUserMessage = {
      sender: "user",
      emoji: emoji,
      content: messagePrefix + text,
      type: "text",
    };
    setMessages([...messages, currentUserMessage]);
  };

  const updateDetailsNeeded = (apiResponse) => {
    // helper function to construct a reply message
    const detailsGiven = apiResponse.split(/[\n,]+/);
    console.log("detailsGiven:", detailsGiven);

    detailsGiven.forEach((detail) => {
      const [key, value] = detail.split(":");
      setInfoToProvide911((prevState) => {
        return { ...prevState, [key]: value };
      });
    });

    let currDetailsToRequest = detailsToRequest.filter(
      (x) => !detailsGiven.some((detail) => detail.includes(x))
    );
    setDetailsToRequest(currDetailsToRequest);
    console.log("detailsToRequest:", detailsToRequest);
  };

  const getChatbotResponse = async (userMessage, detailsToRequest) => {
    // get chatbot response and add to state
    try {
      // call to server to understand response and what information we now have
      console.log("userMessage:", userMessage);
      console.log("detailsToRequest:", detailsToRequest);
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          detailsToRequest: detailsToRequest,
        }),
      });
      if (!response.ok) {
        console.log("response:", response);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Success:", data);
      const apiResponse = data.output;
      console.log("Api Response:", apiResponse);

      updateDetailsNeeded(apiResponse);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  // Inside your functional component
  const scrollToBottom = () => {
    const scrollableContainer = document.getElementById("scrollableContainer");

    if (scrollableContainer) {
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // call the function when the component updates (e.g., new content is added)
  }, [messages]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        backgroundImage: `url('path_to_texture_image.jpg'), linear-gradient(to bottom, #e6f7ff, #ffffff)`,
        backgroundSize: "cover",
        minHeight: "100vh",
        paddingBottom: "20px",
        paddingTop: "40px",
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        margin="auto"
        position="relative"
        justifyContent="center"
        borderRadius={0}
        border={0}
        width="700px"
        sx={{
          height: "80vh",
          border: "none",
          // display: "flex",
          // flexDirection: "row",
          gap: "10px",
        }}
      >
        <Box
          id="scrollableContainer"
          sx={{
            height: "100%",
            width: "100%",
            overflowY: "auto", // Enable vertical scrolling
            paddingRight: "10px",
            position: "absolute",
            top: 0,
            y: 0, // Add a bit of right padding to avoid content covering the scrollbar
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          <MessagesPane
            messages={messages}
            onSelect={onSelect}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              p: "20px",
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        sx={{
          position: "relative",
          left: -165,
          bottom: "5vh",
          paddingTop: "40px",
        }}
      >
        <InputBar
          value={userMessage}
          placeholder="Use this to provide us textual details, if you can"
          onSubmit={onMessageSubmit}
          onChange={(e) => setUserMessage(e.target.value)}
        />
      </Grid>
    </Grid>
  );
}

export default App;
