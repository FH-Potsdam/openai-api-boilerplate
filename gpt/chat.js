require("dotenv").config({path: ".env"});
const { Configuration, OpenAIApi } = require("openai");
const { saveOutput } = require('../utils.js');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

(async () => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {role: "system", content: "You are a helpful assistant."},
      {role: "user", content: "Hello world"}
    ],
  });
  saveOutput("chat", response);
})();
