const db = require('../helpers/db')

module.exports = {
  createHireModel: (enId, pjId, hrPrice, hrMessage, hrStatus) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO hire (en_id, pj_id, hr_price, hr_message, hr_status, hr_date_confirm) VALUES 
        ('${enId}', '${pjId}', '${hrPrice}', '${hrMessage}', '${hrStatus}', null)`
      console.log(query)
      db.query(query, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
          console.log(error)
        }
      })
    })
  },
  getDataHireByIdModel: (hireId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM hire WHERE hr_id = ${hireId}`
      db.query(query, (error, results, fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
          console.log(error)
        }
      })
    })
  },
  updateDataHireByIdModel: (hireId, data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE hire
         SET ?
       WHERE hr_id = ${hireId}
    `
      db.query(query, data, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
          console.log(error)
        }
      })
    })
  },
  deleteDataHireByIdModel: (hireId) => {
    return new Promise((resolve, reject) => {
      const query = `
    DELETE FROM 
    hire
     WHERE ?
    `
      db.query(query, { hr_id: hireId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
          console.log(error)
        }
      })
    })
  },
  updateStatusHireByIdModel: (hireId, hrStatus) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE hire SET hr_status = '${hrStatus}', hr_date_confirm = CURRENT_TIMESTAMP WHERE hr_id = ${hireId} `
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
  getAllDataHirerModel: () => {
    return new Promise((resolve, reject) => {
      const querySelect = 'SELECT * FROM hire'
      db.query(querySelect, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  getHireByEnIdModel: (enId) => {
    console.log(enId)
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM hire hr JOIN engineer en ON (hr.en_id = en.en_id) JOIN project pj ON (hr.pj_id = pj.pj_id) 
      JOIN company cn ON (pj.cn_id = cn.cn_id) WHERE hr.en_id = ${enId}`

      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getHireByProjectIdModel: (pjId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM hire hr JOIN engineer en ON (hr.en_id = en.en_id) JOIN account ac ON(en.ac_id = ac.ac_id) WHERE hr.pj_id = ${pjId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
