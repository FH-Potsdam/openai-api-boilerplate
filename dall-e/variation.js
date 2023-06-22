require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const { saveBase64 } = require('../utils.js');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImageVariation(
    fs.createReadStream("./dall-e/assets/image.png"),
    1,
    "1024x1024",
    "b64_json"
  );
  for (let i = 0; i < response.data.data.length; i += 1) {
    saveBase64("variation-"+i, response.data.data[i].b64_json);
  }
})();