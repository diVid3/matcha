const SQLCon = require('../config/SQLCon');
const bcrypt = require('bcrypt');
const InputValidation = require('../helpers/InputValidation');

class UsersModel {

  static createUser(data) {
    
    return new Promise((res, rej) => {

      if (!InputValidation.isValidRegistrationData(data)) {
  
        rej(true);
      }
      
      // To validate use: bcrypt.compareSync(myPlaintextPassword, hash);
      const hashedPassword = bcrypt.hashSync(data.password, 10);

      const con = SQLCon.getCon();

      const sql = 'INSERT INTO `matcha`.`users` SET ?';

      const set = {
        first_name: data.firstName,
        last_name: data.lastName,
        gender: data.gender - 0,
        biography: data.biography,
        username: data.username,
        email: data.email,
        password: hashedPassword,
        fame_rating: data.fameRating - 0,
        latitude: data.latitude,
        longitude: data.longitude,
        last_seen: data.lastSeen - 0,
        age: data.age - 0,
        verify_token: data.verifyToken,
        verified: data.verified - 0
      }

      con.query(sql, set, (err, results, fields) => {
        
        if (err) {

          rej(true);
        }

        res(true);
      });
    });
  }

  static getAllUsers() {
    
  }

  static getUserByID() {

    const con = SQLCon.getCon();

    // TODO: Finish this.
  }

  static getUserByUsername() {

    const con = SQLCon.getCon();

    
  }
}

module.exports = UsersModel;