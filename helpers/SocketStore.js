const socketStore = {}

class SocketStore {

  // Call this whenever a socket connection is opened.
  static updateSocket(cookieStr, socket) {

    for (const username in socketStore) {

      if (cookieStr.includes(socketStore[username].cookieStr)) {

        socketStore[username].socket = socket
      }
    }
  }

  // Call this when a user successfully logged in.
  static addEntry(username, newCookieStr, socket) {

    socketStore[username] = {
      cookieStr: newCookieStr,
      socket: socket || null
    }
  }

  // Call this when a user logs out.
  static removeEntry(username) {

    delete socketStore[username]
  }

  static getSocket(username) {

    if (socketStore[username]) {

      return socketStore[username].socket
    }
  }
}

module.exports = SocketStore