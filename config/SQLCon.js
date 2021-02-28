const mysql = require('mysql')

// Private Singleton.
const con = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  multipleStatements: true
})

class SQLCon {

  static initCon() {

    return new Promise((resolve, reject) => {
      con.connect((err) => {  
        if (err) {
          reject(err)
        }
        resolve('Connected to AWS RDS.')
      })
    })
  }

  static getCon() {

    return con
  }
}

module.exports = SQLCon
