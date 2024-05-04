//  random int generator
const generateInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

const map = new Map([
  [10, "A"],
  [11, "B"],
  [12, "C"],
  [13, "D"],
  [14, "E"],
  [15, "F"],
]);

//  random color generator
const generateHexColor = () =>
  // `rgb(${generateInt(0, 255)}, ${generateInt(0, 255)}, ${generateInt(0, 255)})`;
  {
    let result = "#";
    for (let i = 0; i < 6; i++) {
      const randomInt = generateInt(0, 15);
      result += randomInt > 9 ? map.get(randomInt) : randomInt;
    }
    return result;
  };

const shuffleArray = (arr) => {
  const tempArr = [...arr];
  const result = [];
  let currentLength = arr.length - 1;

  for (let i = 0; i < arr.length; i++) {
    const randomIndex = generateInt(0, currentLength--);
    result.push(tempArr[randomIndex]);
    tempArr.splice(randomIndex, 1);
  }

  return result;
};

export { generateInt, generateHexColor, shuffleArray };
