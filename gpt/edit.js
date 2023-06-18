require("dotenv").config({path: ".env"});
const { Configuration, OpenAIApi } = require("openai");
const { saveOutput } = require('../utils.js');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

(async () => {
  const response = await openai.createEdit({
    model: "text-davinci-edit-001",
    input: "I am the author of this work.",
    instruction: "Turn first person writing into third person, the persons name is Cathrine",
  });
  saveOutput("edit", response);
})();

/*
input: "What day of the wek is it?",
instruction: "Fix the spelling mistakes",
*/