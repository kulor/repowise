const express = require('express')
const next = require('next')
const pkgsApi = require('./api/pkgs')
const badge = require('./api/badge')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Heroku header (https://devcenter.heroku.com/articles/http-routing#heroku-headers) sent when going through https enabled proxy
const forceSsl = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

app.prepare()
.then(() => {
  const server = express()

  if (process.env.NODE_ENV === 'production') {
    server.use(forceSsl)
  }

  server.get('/package/:id', (req, res) => {
    return app.render(req, res, '/pkg', req.params)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  const PORT = process.env.PORT || 3000

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
  })
})
