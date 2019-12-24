class ConfigureSockets {

  static attachPresenceListeners(socket) {

    socket.on('fromClientUserLoggedIn', (data) => {
      socket.broadcast.emit('fromServerUserLoggedIn', data)
    })

    socket.on('fromClientUserLoggedOff', (data) => {
      socket.broadcast.emit('fromServerUserLoggedOff', data)
    })
  }
}

module.exports = ConfigureSockets