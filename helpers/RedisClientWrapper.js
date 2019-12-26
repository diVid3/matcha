let redisClient = null

class RedisClientWrapper {

  static getRedisKey(socket) {

    let redisKey = undefined

    if (socket.request.headers.cookie) {

      const cookieArr = socket.request.headers.cookie.split('; ')
  
      cookieArr.forEach((cookie) => {

        if (cookie.includes('sid')) {

          const cookieStr = cookie.split('=')[1]
          redisKey = 'sess:' + cookieStr.split('.')[0].slice(4, 999)
        }
      })
    }

    return redisKey
  }

  static saveRedisClient(newRedisClient) {

    redisClient = newRedisClient
  }

  static getRedisClient() {

    return redisClient
  }
}

module.exports = RedisClientWrapper