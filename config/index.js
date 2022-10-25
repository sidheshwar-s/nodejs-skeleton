const convict = require('convict');
const convictFormatWithValidator = require('convict-format-with-validator');
const fs = require('fs');
const path = require('path');
const { logger } = require('../src/services/logger');

convict.addFormats(convictFormatWithValidator);

const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['development', 'test', 'production'],
        default: 'development',
        env: 'NODE_ENV',
    },
    ip: {
        doc: 'The IP address to bind.',
        format: 'ipaddress',
        default: '127.0.0.1',
        env: 'IP',
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT',
    },
    db: {
        debug: {
            doc: 'Debug database queries',
            format: Boolean,
            default: false,
            env: 'DB_DEBUG',
        },
        client: 'pg',
        connection: {
            host: {
                doc: 'Database host name/IP',
                format: '*',
                default: '127.0.0.1',
                env: 'DB_HOST',
            },
            port: {
                doc: 'Database port',
                format: 'port',
                default: 5432,
                env: 'DB_PORT',
            },
            database: {
                doc: 'Database name',
                format: String,
                default: 'spot-store',
                env: 'DB_NAME',
            },
            user: {
                doc: 'Database user',
                format: String,
                default: 'postgres',
                env: 'DB_USER',
            },
            password: {
                doc: 'Database password',
                format: String,
                default: 'postgres',
                sensitive: true,
                env: 'DB_PASSWORD',
            },
        },
        pool: {
            min: 2,
            max: 10,
        },
    },
    ci: {
        doc: "Flag indicating whether we're running on a CI server",
        format: Boolean,
        default: false,
        env: 'CI',
    },
});

const configFilePath = path.join(__dirname, 'development.json');
try {
    fs.readFileSync(configFilePath, { encoding: 'utf8' });
    config.loadFile(configFilePath);
} catch {
    logger.info(
        '[Convict: Middleware Config] Not found any configuration file, will use the ENV variable or default configuration.',
    );
}
config.validate({ allowed: 'strict' });

module.exports = config;
