const fs = require('fs').promises;

const getTalkerData = async () => {
    const talkerFile = './talker.json';
return JSON.parse(await fs.readFile(talkerFile, 'utf-8'));
};

const addTalkerData = async (dataToAdd) => {
    const talkerFile = './talker.json';
    return fs.writeFile(talkerFile, JSON.stringify(dataToAdd));
};

const findTalkerById = async (id) => {
    const talkerData = await getTalkerData();
    return talkerData.find((talker) => talker.id === id);
};

module.exports = { 
    getTalkerData,
    addTalkerData,
    findTalkerById, 
};
