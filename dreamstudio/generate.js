require("dotenv").config();
const axios = require("axios");
const fs = require('fs');
const {saveBase64} = require('../utils');

const engineId = 'stable-diffusion-v1-5'
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
const apiKey = process.env.STABILITY_API_KEY

if (!apiKey) {
  throw new Error('Missing Stability API key.');
}

(async () =>  {
  for (let i = 10; i <= 150; i += 1) {
    await axios.post(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
      text_prompts: [
        {
          text: 'pattern of glitter confetti',
        },
      ],
      cfg_scale: 7,
      clip_guidance_preset: 'FAST_BLUE',
      height: 512,
      width: 512,
      samples: 1,
      seed:1234,
      steps: i,
      style_preset: "tile-texture"
    }, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': `application/json`, // multipart/form-data; boundary=${formData._boundary}
      }
    })
      .then((response) => {
        //handle success
        response.data.artifacts.forEach((a, ai) => {
          saveBase64(`network/ds-generate-id1-${i}-${ai}-`, a.base64);
        });
      }).catch((error) => {
        //handle error
        console.log(error);
      });
  }
})();