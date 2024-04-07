import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import OpenAI from "openai";
import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

const anthropic = new Anthropic();

app.get("/", (request, response) => {
  response.send("Hello from the server!");
});

app.post("/", async (request, response) => {
  try {
    console.log("Request body:", request.body);
    const { message, detailsToRequest } = request.body;
    console.log(message);
    const content = message.content;
    console.log("string:", content);

    const formattedDetails = detailsToRequest.map((s) => `- ${s}\n`);

    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0,
      system: `I am a 911 dispatcher. You will receive a message we received from a user. The following is the information we need. Can you extract the information provided, if they provided it? If they didn\'t provide it, please do not include it in your response. Format your answer as seen in the example later.\n${formattedDetails}\n\nHere is an example of this task:\nMESSAGE: "hello i am hurt, my head is spinning, I AM ABOUT TO PASS OUT"\nYOUR RESPONSE: Type of Incident: Medical Emergency, Details of Incident: Head spinning and about to pass out\n\nDO NOT say: Address: Not Provided, Weapon Involved: Not Provided`,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `MESSAGE: "${content}"`,
            },
          ],
        },
      ],
    });
    console.log(msg);

    // console.log("msg.choices[0].message:", msg.choices[0].message);
    const result = msg.content[0].text;
    console.log("Result:", result);

    response.json({
      output: result,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    response.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
