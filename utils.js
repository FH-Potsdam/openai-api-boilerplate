const {writeFileSync} = require("fs");

const timestamp = () => {
  const d = new Date();
  return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay() + "-" + d.getHours() + "-" + d.getMinutes() + "-" + d.getMilliseconds();
};

const saveOutput = (prefix, content) => {
  writeFileSync(process.cwd() + '/output/' + prefix + "_" + timestamp() + ".json", JSON.stringify(content.data, null, 2), "utf8");
};

const saveBase64 = (prefix, content) => {
  content = content.replace(/^data:image\/png;base64,/, "");
  writeFileSync(process.cwd() + '/output/' + prefix + "_" + timestamp() + ".png", content, 'base64');  
};

const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

module.exports = {saveOutput, shuffle, saveBase64};