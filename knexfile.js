const { resolve } = require('path');

module.exports = {
  development:{
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: resolve(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: resolve(__dirname, 'src', 'db', 'seeds'),
    },
  },
  useNullAsDefault: true,
};
