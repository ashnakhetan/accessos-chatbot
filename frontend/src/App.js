import "./App.css";
import Message from "./components/Message";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InputBar from "./components/InputBar";
import Selection from "./components/Selection";
import MessagesPane from "./components/MessagesPane";
import questionsDict from "./questions";
import questionPrefixes from "./questionPrefixes";

function App() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [detailsToRequest, setDetailsToRequest] = useState([
    "Address",
    "Type of Incident",
    "Details of Incident",
    "Weapon Involved",
  ]);
  // const [chatbotMessages, setChatbotMessages] = useState([]);

  useEffect(() => {
    // creates a chatbot response every time the user sends a message
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === "user"
    ) {
      getChatbotResponse(messages[messages.length - 1]);
    }
  }, [messages]);

  useEffect(() => {
    // creates a chatbot response when we know what new detail to request
    if (detailsToRequest.length === 0) {
      const currentChatbotResponses = [
        {
          sender: "chatbot",
          content:
            "You've provided all the information we need. Someone is on their way. You may continue to chat with us and provide more details, if you are able.",
          type: "text",
        },
      ];
      // setChatbotMessages([...currentChatbotResponses]);
      setMessages([...messages, ...currentChatbotResponses]);
      return;
    }
    const detail = detailsToRequest[0]; // pick the first detail that the chatbot needs to request
    const question = questionsDict[detail].question;
    console.log("question:", question);
    const options = questionsDict[detail].options;
    console.log("options:", options);

    const randomPrefix = // add an appropriate message prefix
      messages.length < 2
        ? questionPrefixes.initial[
            Math.floor(Math.random() * questionPrefixes.initial.length)
          ]
        : questionPrefixes.subsequent[
            Math.floor(Math.random() * questionPrefixes.subsequent.length)
          ];

    const currentChatbotResponses = [
      // make the question message
      {
        sender: "chatbot",
        content: randomPrefix + " " + question,
        type: "text",
      },
    ];

    if (options != null) {
      // push the options
      currentChatbotResponses.push({
        sender: "chatbot",
        content: options,
        type: "selection",
      });
    }
    setMessages([...messages, ...currentChatbotResponses]);
    // setChatbotMessages([...currentChatbotResponses]);
    return;
  }, [detailsToRequest]);

  const onMessageSubmit = (e) => {
    // adds the user's message to the state
    const currentUserMessage = {
      sender: "user",
      content: userMessage,
      type: "text",
    };
    setMessages([...messages, currentUserMessage]);
    setUserMessage("");
  };

  const onSelect = (emoji, text) => {
    // when a user selects an option, adds this as a message
    const currentUserMessage = {
      sender: "user",
      emoji: emoji,
      content: text,
      type: "text",
    };
    setMessages([...messages, currentUserMessage]);
  };

  const createReplyMessage = (apiResponse) => {
    // helper function to construct a reply message
    // const criticalDetails = [
    //   "Address",
    //   "Type of Incident",
    //   "Details of Incident",
    //   "Weapon Involved",
    // ];
    const detailsGiven = apiResponse.split(/[\n,]+/);
    console.log("detailsGiven:", detailsGiven);

    let currDetailsToRequest = detailsToRequest.filter(
      (x) => !detailsGiven.some((detail) => detail.includes(x))
    );
    setDetailsToRequest(currDetailsToRequest);
    console.log("detailsToRequest:", detailsToRequest);

    // if (detailsToRequest.length === 0) {
    //   const currentChatbotResponses = [
    //     {
    //       sender: "chatbot",
    //       content:
    //         "You've provided all the information we need. Someone is on their way. You may continue to chat with us and provide more details, if you are able.",
    //       type: "text",
    //     },
    //   ];
    //   return currentChatbotResponses;
    // }
    // const detail = detailsToRequest[0]; // pick the first detail that the chatbot needs to request
    // const question = questionsDict[detail].question;
    // console.log("question:", question);
    // const options = questionsDict[detail].options;
    // console.log("options:", options);

    // const randomPrefix = // add an appropriate message prefix
    //   messages.length < 2
    //     ? questionPrefixes.initial[
    //         Math.floor(Math.random() * questionPrefixes.initial.length)
    //       ]
    //     : questionPrefixes.subsequent[
    //         Math.floor(Math.random() * questionPrefixes.subsequent.length)
    //       ];

    // const currentChatbotResponses = [
    //   // make the question message
    //   {
    //     sender: "chatbot",
    //     content: randomPrefix + " " + question,
    //     type: "text",
    //   },
    // ];

    // if (options != null) {
    //   // push the options
    //   currentChatbotResponses.push({
    //     sender: "chatbot",
    //     content: options,
    //     type: "selection",
    //   });
    // }

    // return currentChatbotResponses;
  };

  const getChatbotResponse = async (userMessage) => {
    // get chatbot response and add to state
    try {
      // call to server to understand response and what information we now have
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
      const apiResponse = data.output;
      console.log("Api Response:", apiResponse);

      createReplyMessage(apiResponse);
      // const chatbotResponses = createReplyMessage(apiResponse); // create a reply, given this api response
      // console.log("chatbotResponses:", chatbotResponses);
      // add all of the chatbot's response messages to the state
      // setMessages((prevMessages) => [...prevMessages, ...chatbotResponses]);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <Grid  container direction="column" alignItems="center" sx={{ backgroundImage: `url('path_to_texture_image.jpg'), linear-gradient(to bottom, #e6f7ff, #ffffff)`, backgroundSize: "cover", minHeight: "100vh"  }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        margin="auto"
        justifyContent="center"
        borderRadius={0}
        border={0}
        width="700px"
        sx={{
          height: "80vh",
          border: "none",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
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
