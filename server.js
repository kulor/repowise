const express = require('express')
const next = require('next')
const pkgsApi = require('./api/pkgs')
const badge = require('./api/badge')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/badge/:pkg', (req, res) => {
    badge(req.params.pkg, (svg, err) => {
      if(err) {
        return res.status(500).send(err.message);
      }
      res.set('Content-Type', 'image/svg+xml;charset=utf-8');
      res.send(svg);
    })
  })

  server.get('/pkg/:id', (req, res) => {
    return app.render(req, res, '/pkg', req.params)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
  })
})