const fs = require('fs').promises;

const getTalkerData = async () => {
    const talker = './talker.json';
return JSON.parse(await fs.readFile(talker, 'utf-8'));
};

const addTalkerData = async (dataToAdd) => {
    const talker = './talker.json';
    return fs.writeFile(talker, JSON.stringify(dataToAdd));
};

module.exports = { getTalkerData, addTalkerData };
