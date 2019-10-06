const mysql = require('mysql');

// Private Singleton.
const con = mysql.createConnection({
  'host': 'matcha.cfsc0xmh8tva.eu-west-2.rds.amazonaws.com',
  'user': 'admin',
  'password': '#Fadora123'
});

class SQLCon {

  static initCon() {

    return new Promise((resolve, reject) => {
      con.connect((err) => {  
        if (err) {
          reject(err);
        }
        resolve('Connected to AWS RDS.');
      });
    });
  }

  static getCon() {

    return con;
  }
}

module.exports = SQLCon;