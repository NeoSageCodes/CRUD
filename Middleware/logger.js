const {writeDB} = require('../Controller/user')
const logger = async (req, res, next) => {
    const date = new Date();
    const log = `API with Endpoint: ${req.url} and HTTP Method: ${req.method} was called at: ${date.toLocaleString}`;

    await writeDB('./logs.txt', log)

    next()
};

module.exports = logger