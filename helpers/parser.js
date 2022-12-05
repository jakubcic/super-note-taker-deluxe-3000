// function to parse a string template into a string with values from an object
const stringTemplateParser = (expression, valueObj) => {
  const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
  let text = expression.replace(templateMatcher, (substring, value, index) => {
    value = valueObj[value];
    return value;
  });
  console.log(text);
  return text;
};


module.exports = stringTemplateParser;
