const fs = require('fs');

const appendDB = (data) => {
    return new Promise((resolve, reject) => {
        return fs.appendFile('./logs.txt', data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};

const logger = async (req, res, next) => {
    const date = new Date();
    const log = `\nAPI with Endpoint: "${req.url}" and HTTP Method: "${req.method}" was called at: "${date.toLocaleString()}"`;

    await appendDB(log)

    next()
};

module.exports = logger