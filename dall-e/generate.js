require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const { saveBase64 } = require('../utils.js');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: "A cute baby sea otter",
    n: 1,
    size: "1024x1024",
    response_format: "b64_json"
  });
  for (let i = 0; i < response.data.data.length; i += 1) {
    saveBase64("generate-"+i, response.data.data[i].b64_json);
  }
})();