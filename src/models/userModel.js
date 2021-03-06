const db = require('../helpers/db')

module.exports = {
  getUserModel: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM account WHERE ac_email = ? ', email, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
