const db = require('../helpers/db')

module.exports = {
  createHireCompanyModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO company SET ?'
      db.query(query, data, (error, result, _fields) => {
        if (!error) {
          const newResult = {
            id: result.insertId
          }
          resolve(newResult)
        } else {
          reject(error)
        }
      })
    })
  },
  getAllDataCompanyModel: () => {
    return new Promise((resolve, reject) => {
      const querySelect = 'SELECT * FROM company cn JOIN account ac ON ac.ac_id = cn.ac_id'
      db.query(querySelect, (error, result, _fields) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  getDataCompanyByIdModel: (companyId) => {
    return new Promise((resolve, reject) => {
      const querySelect = `SELECT * FROM company cn JOIN account ac ON ac.ac_id = cn.ac_id WHERE cn_id = ${companyId}`
      db.query(querySelect, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
          console.log(err)
        }
      })
    })
  },
  updateCompanyModel: (companyId, cnName, cnPosition, cnPart, cnCity, cnDesc, cnInstagram, cnLinkedIn, data) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE company SET cn_name = '${cnName}', cn_position = '${cnPosition}', cn_part = '${cnPart}', cn_city = '${cnCity}', cn_desc = '${cnDesc}', cn_instagram = '${cnInstagram}', cn_linkedin = '${cnLinkedIn}', cn_foto_profile= '${data}', cn_updated_at = CURRENT_TIMESTAMP WHERE 
      cn_id = '${companyId}'`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
          console.log(err)
        }
      })
    })
  },
  updatePatchCompanyModel: (companyId, dataColumn) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE company SET ${dataColumn} WHERE cn_id = ${companyId}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getDataCompanyByAccountIdModel: (accountId) => {
    return new Promise((resolve, reject) => {
      const querySelect = `SELECT * FROM account ac JOIN company cn ON ac.ac_id = cn.ac_id WHERE ac.ac_id = ${accountId}`
      db.query(querySelect, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
