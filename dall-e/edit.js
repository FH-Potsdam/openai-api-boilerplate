require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const { saveBase64 } = require('../utils.js');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImageEdit(
    fs.createReadStream("./dall-e/assets/image.png"),
    // "Giant disco ball",
    // "A massive interstellar black hole",
    "A full moon",
    fs.createReadStream("./dall-e/assets/mask.png"),
    1,
    "1024x1024",
    "b64_json"
  );
  for (let i = 0; i < response.data.data.length; i += 1) {
    saveBase64("edit-"+i, response.data.data[i].b64_json);
  }
})();