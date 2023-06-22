require("dotenv").config();
const FormData = require("form-data");
const axios = require("axios");
const fs = require('fs');
const {saveBase64} = require('../utils');

const engineId = 'stable-inpainting-512-v2-0'
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
const apiKey = process.env.STABILITY_API_KEY

if (!apiKey) {
  throw new Error('Missing Stability API key.');
}

// NOTE: This example is using a NodeJS FormData library. Browser
// implementations should use their native FormData class. React Native
// implementations should also use their native FormData class.
const formData = new FormData();
formData.append('init_image', fs.readFileSync('./dall-e/assets/image-512.png'));
formData.append('mask_image', fs.readFileSync('./dall-e/assets/mask-512.png'));
formData.append('mask_source', 'MASK_IMAGE_BLACK');
formData.append(
  'text_prompts[0][text]',
  'Giant disco ball'
);
formData.append('cfg_scale', '7');
formData.append('clip_guidance_preset', 'FAST_BLUE');
formData.append('samples', 1);
formData.append('steps', 30);

axios.post(`${apiHost}/v1/generation/${engineId}/image-to-image/masking`, formData, {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
  }
})
  .then((response) => {
    //handle success
    response.data.artifacts.forEach((a, ai) => {
      saveBase64(`ds-edit-${ai}-`, a.base64);
    });
  }).catch((error) => {
    //handle error
    console.log(error);
  });