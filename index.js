const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('fs').promises;

// const { getTalkerData, addTalkerData } = require('./fs-utils');

const getTalkerData = async () => {
  const talker = './talker.json';
return JSON.parse(await fs.readFile(talker, 'utf-8'));
};

const addTalkerData = async (dataToAdd) => {
  const talker = './talker.json';
  return fs.writeFile(talker, JSON.stringify(dataToAdd));
};

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkerData = await getTalkerData();
  if (talkerData.length > 0) {
    res.status(200).json(talkerData);
  }
  if (talkerData.length === 0) {
    res.status(200).json([]);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
