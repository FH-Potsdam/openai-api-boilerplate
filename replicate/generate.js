require("dotenv").config();
const Replicate = require("replicate");
const {saveImage} = require('../utils');

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

(async () => {
  const output = await replicate.run(
    "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
    {
      input: {
        prompt: "a vision of paradise. unreal engine",
        image_dimensions: "512x512",
        // negative_prompt: "",
        num_outputs: 1,
        num_inference_steps: 20,
        guidance_scale: 7.5,
        seed: 1
      }
    }
  );
  output.forEach((o, oi) => {
    saveImage(`rep-${oi}`, o);
  });
})();
