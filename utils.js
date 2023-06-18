const {writeFileSync} = require("fs");

const saveOutput = (prefix, content) => {
  const d = new Date();
  const ds = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay() + "-" + d.getHours() + "-" + d.getMinutes() + "-" + d.getMilliseconds();
  writeFileSync(process.cwd() + '/output/' + prefix + "_" + ds + ".json", JSON.stringify(content.data, null, 2), "utf8");
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

module.exports = {saveOutput, shuffle};