const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { authMiddleware,
        talkerPostValidator,
        nameAgeValidator,
        talkObjValidator1,
        talkObjValidator2,
      } = require('./middlewares');

const { getTalkerData, addTalkerData, findTalkerById, generateRandomToken, editTalkerById } = require('./fs-utils');

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

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  const searchResult = await findTalkerById(numberId);
  if (searchResult) {
    res.status(200).json(searchResult);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.post('/login', authMiddleware, async (req, res) => 
res.status(200).json({ token: generateRandomToken() }));

app.post(
  '/talker',
  talkerPostValidator,
  nameAgeValidator,
  talkObjValidator1,
  talkObjValidator2,
  async (req, res) => {
  const newTalker = await addTalkerData(req.body);
  res.status(201).json(newTalker); 
},
);

app.put(
  '/talker/:id',
  talkerPostValidator,
  nameAgeValidator,
  talkObjValidator1,
  talkObjValidator2,
  async (req, res) => {
  const updatedTalker = await editTalkerById(req.body, req.params.id);
  res.status(200).json(updatedTalker);
},
);

app.listen(PORT, () => {
  console.log('Online');
});
