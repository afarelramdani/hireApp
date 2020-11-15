const db = require('../helpers/db')

module.exports = {
  createHireExperienceModel: (exPosition, exCompany, exStart, exEnd, exDesc) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO experience (ex_position, ex_company, ex_start, ex_end, ex_desc) VALUES 
        ('${exPosition}', '${exCompany}', '${exStart}', '${exEnd}', '${exDesc}')`
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
  getDataExperienceByIdModel: (experienceId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM experience WHERE ex_id = ${experienceId}`
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
  updateDataExperienceByIdModel: (experienceId, data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE experience
         SET ?
       WHERE ex_id = ${experienceId}
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
  deleteDataExperienceByIdModel: (experienceId) => {
    return new Promise((resolve, reject) => {
      const query = `
    DELETE FROM 
    experience
     WHERE ?
    `
      db.query(query, { ex_id: experienceId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
