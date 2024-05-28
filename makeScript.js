const fs = require('fs');
const jsYaml = require('js-yaml');

// 读取 YAML 文件的路径
const filePath = '../s.yaml';
try {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  // 解析 YAML 文件内容
  const data = jsYaml.load(fileContents);
  const environmentVariables = data.resources.fcDemo.props.environmentVariables;
  const {SECRET_KEY, API_KEY, CHATBOT_URL, TOKEN_URL} = environmentVariables;
  console.log(`SECRET_KEY=${SECRET_KEY}`, `API_KEY=${API_KEY}`, `CHATBOT_URL=${CHATBOT_URL}`, `TOKEN_URL=${TOKEN_URL}`, ' node ./index.js');
} catch (err) {
  console.error('解析 YAML 时出错:', err);
}