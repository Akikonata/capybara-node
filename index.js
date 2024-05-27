const express = require('express');
const bodyParser = require('body-parser');
const prompt = require('./prompt');
const wenxin = require('./wenxin');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = 9000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/ping', (req, res) => {
  res.send('pong')
})
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  const query = prompt.buildCamelPrompt(message);
  const data = await wenxin.chat(query);
  res.json({
    data: await prompt.extractJSONFromMarkdown(data),
    status: 'ok'
  })
})
// app.post('/*', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})