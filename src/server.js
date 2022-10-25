/** load dependencies */
const express = require('express');
const cors = require('cors');
const config = require('../config');
const { logger } = require('./services/logger');

/** load modules as routes */

/** declare application and load middleware */
const app = express();
app.use(cors());

/** use json parser and body parser */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** show alive status on server root */
app.get('/', (req, res) => {
    try {
        res.status(200).send({ message: 'Server is live !!', alive: true });
    } catch (error) {
        res.status(400).send({
            message: 'Server is not live !!',
            alive: false,
        });
    }
});

/** bind all rooutes to application */

/** Start server */
const PORT = config.get('port');
app.listen(PORT, () => {
    logger.info(`Server listening on http://localhost:${PORT}`);
});
