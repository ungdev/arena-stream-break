const path = require('path')
const express = require('express')
const serveStatic = require('serve-static')
const webpack = require('webpack')

const CLIENT = path.join(__dirname, 'client')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const webpackConfig = require('./webpack.config.js')
const waitForInitialBuild = () => new Promise((resolve) => {
  console.log('Waiting for client building...')

  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err)
      console.log(stats.toString())

      throw new Error('Build failed')
    }

    console.log(stats.toString('minimal'))
    resolve()
  })
})

app.use('/', serveStatic(CLIENT, { maxAge: '7 days' }))

app.get('*', (req, res) => {
  res.sendFile(path.join(CLIENT, 'index.html'))
})

io.on('connection', (socket) => {
  socket.on('admin@start', () => {
    console.log('[admin] start')
    socket.broadcast.emit('start')
  })

  socket.on('admin@reset', () => {
    console.log('[admin] reset')
    socket.broadcast.emit('reset')
  })

  socket.on('admin@next', (next) => {
    console.log('[admin] next', JSON.stringify(next))
    socket.broadcast.emit('next', next)
  })

  socket.on('client@status', (status) => {
    console.log('[client] status', JSON.stringify(status))
    socket.broadcast.emit('client@status', status)
  })
})

async function start() {
  await waitForInitialBuild()

  const port = process.env.STREAM_PORT || 8080

  server.listen(port, () => {
    console.log(`Listenning on port ${port}`);
  });
}

start()
