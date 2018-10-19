const handler = require('serve-handler')
const micro = require('micro')
const socketio = require('socket.io')

let state = {
  game: null,
  next: null
}

const server = micro((req, res) => handler(req, res, {
  rewrites: [
    { source: 'admin', destination: '/index.html' }
  ],
  public: 'dist'
}))

const io = socketio(server)

io.on('connection', socket => {
  console.log('connect')
  socket.emit('state', state)

  socket.on('setState', ({ game, next }, ack) => {
    state.game = game
    state.next = next

    setTimeout(() => tick(), 1000)

    console.log(`Set new state to ${JSON.stringify(state)}`)

    io.emit('state', state)

    ack()
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
  })
})

const tick = () => {
  if (state.next && state.next > 1000) {
    state.next -= 1000

    setTimeout(() => tick(), 1000)
  }
}

const port = process.env.PORT || 7575

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})