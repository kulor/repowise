const express = require('express')
const next = require('next')
const pkgsApi = require('./api/pkgs')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/pkgs/:pkgList', (req, res) => {
    const packageList = req.params.pkgList.split(',') || ['react','react-dom', 'preact', 'jquery']
    pkgsApi(packageList).then((data) => {
      res.send(data);
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})