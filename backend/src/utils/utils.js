function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function obfuscateName(name) {
  const chars = name.split("");
  const totalChars = chars.length;
  const numToObfuscate = Math.floor(totalChars / 2);

  // Create an array of indices to choose from
  const indices = [...Array(totalChars).keys()];

  // Randomly select indices to obfuscate
  for (let i = 0; i < numToObfuscate; i++) {
    const randomIndex = Math.floor(Math.random() * indices.length);
    const charIndex = indices.splice(randomIndex, 1)[0];
    chars[charIndex] = "_";
  }

  return chars.join("");
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getBody(req) {
  return new Promise((resolve) => {
    const bodyParts = [];
    let body;
    req
      .on("data", (chunk) => {
        bodyParts.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(bodyParts).toString();
        resolve(JSON.parse(body));
      });
  });
}

module.exports = {
  getRandomInt,
  obfuscateName,
  shuffleArray,
  getBody,
};
