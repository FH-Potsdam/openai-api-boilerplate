require("dotenv").config();
const FormData = require("form-data");
const axios = require("axios");
const fs = require('fs');
const {saveBase64} = require('../utils');

const engineId = 'stable-diffusion-v1-5'
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
const apiKey = process.env.STABILITY_API_KEY

if (!apiKey) {
  throw new Error('Missing Stability API key.');
}

const formData = new FormData()
formData.append('init_image', fs.createReadStream('./dall-e/assets/image-512.png'))
formData.append('init_image_mode', 'IMAGE_STRENGTH')
formData.append('image_strength', 0.35)
formData.append('text_prompts[0][text]', 'Galactic dog wearing a cape')
formData.append('cfg_scale', 7)
formData.append('clip_guidance_preset', 'FAST_BLUE')
formData.append('samples', 1)
formData.append('steps', 30)

axios.post(`${apiHost}/v1/generation/${engineId}/image-to-image`, formData, {
  headers: {
    ...formData.getHeaders(),
    Accept: 'application/json',
    Authorization: `Bearer ${apiKey}`,
    // 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
  }
})
  .then((response) => {
    //handle success
    response.data.artifacts.forEach((a, ai) => {
      saveBase64(`ds-variation-${ai}-`, a.base64);
    });
  }).catch((error) => {
    //handle error
    console.log(error);
  });