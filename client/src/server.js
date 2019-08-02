const express = require('express');
const next = require('next');
const dotenv = require('dotenv').config();

const nextI18NextMiddleware = require('next-i18next/middleware').default;
const nextI18next = require('./i18n');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3001;

const app = next({
  dir: './src',
  dev
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})
.catch(ex => {
  console.error(ex.stack);
  process.exit(1);
});
