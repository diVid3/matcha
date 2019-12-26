// TODO: This should operate like: socketStore['sessionCookie'] -> { username: diVid3, socketID: jsdkfjlksjdlkf }
// OR
// socketStore['diVid3'] -> { sessionCookieStr: 'sdjfkljslkdjflksl', socketID: 'jsdkfjlksjdlkf' }
//
// 2nd one has better performance.

const socketStore = {}
let socketSessionInfo = null

class SocketStore {

  // Call this whenever a socket connection is opened.
  static updateSocket(cookieStr, socket) {

    for (const username in socketStore) {

      if (cookieStr.includes(socketStore[username].cookieStr)) {

        socketStore[username].socket = socket
      }
    }

    // console.log('updateSocket was called!', socketStore)
  }

  // Call this when a user successfully logged in.
  static addEntry(username, newCookieStr, socket) {

    socketStore[username] = {
      cookieStr: newCookieStr,
      socket: socket || null
    }

    // console.log('addEntry was called!', socketStore)
  }

  // Call this when a user logs out.
  static removeEntry(username) {

    delete socketStore[username]

    // console.log('removeEntry was called!', socketStore)
  }

  static getSocket(username) {

    if (socketStore[username]) {

      return socketStore[username].socket
    }
  }

  static saveSocketSessionInfo(data) {

    socketSessionInfo = JSON.parse(data)

    console.log(socketSessionInfo)
  }

  static getSocketSessionInfo() {

    return socketSessionInfo
  }
}

module.exports = SocketStore