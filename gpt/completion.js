require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const { saveOutput } = require('../utils.js');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

(async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
    // top_p: 1,
    n: 1,
    stream: false,
  });
  saveOutput('completion', response);  
})();