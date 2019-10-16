const SQLCon = require('../config/SQLCon');
const InputValidation = require('../helpers/InputValidation');

class AuthenticationModel {

  static verifyRegistration(data) {

    return new Promise((res, rej) => {

      const uuid = data.uuid;

      if (!InputValidation.isValidUuid(uuid)) {

        rej(400);
      }

      const con = SQLCon.getCon();
      const sql = 'UPDATE `matcha`.`users` SET `verified` = 1 WHERE `verify_token` = ?';

      con.query(sql, [uuid], (err, rows, fields) => {
        
        if (err) {
          
          rej(500);
        }
        
        const sql2 = 'UPDATE `matcha`.`users` SET `verify_token` = NULL WHERE `verify_token` = ?';
        
        con.query(sql2, [uuid], (err, rows, fields) => {
          
          if (err) {

            rej(500);
          }

          res(true);
        });
      });
    });
  }


}

module.exports = AuthenticationModel;