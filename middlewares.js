const authMiddleware = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!email.match(/\w+@\w+.com/)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

const talkerPostValidator = (req, res, next) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const { Authorization } = req.headers;
    if (!Authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (Authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;
