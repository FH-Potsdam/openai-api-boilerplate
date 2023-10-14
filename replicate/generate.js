require("dotenv").config();
const Replicate = require("replicate");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {saveImage} = require('../utils');

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  fetch: fetch,
});

(async () => {
  const terms = ["historic", "scifi"];
  for (let t = 0; t < terms.length; t += 1) {
    for (let s = 1; s < 4; s += 1) {
      let k = 1;
      for (let i = 10; i < 150; i += k) {
        k += 1;
        const output = await replicate.run(
          "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
          {
            input: {
              prompt: terms[t] + " interface design",
              image_dimensions: "512x512",
              // negative_prompt: "",
              num_outputs: 1,
              num_inference_steps: i,
              guidance_scale: 7.5,
              seed: s
            }
          }
        );
        output.forEach((o, oi) => {
          saveImage(`rep-id3-${terms[t]}-${s}-${i}-${oi}`, o);
        });
      }
    }
  }
})();
