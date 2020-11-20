const db = require('../helpers/db')

module.exports = {
  createProjectModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
          INSERT INTO project
          SET ?
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
  getDataProjectByIdModel: (projectId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM project WHERE pj_id = ${projectId}`
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
  updateDataProjectByIdModel: (projectId, cnId, pjProjectName, pjDesc, pjDeadline, data) => {
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE project SET cn_id = '${cnId}', pj_project_name = '${pjProjectName}', 
      pj_desc = '${pjDesc}', pj_deadline = '${pjDeadline}', pj_picture = '${data}', 
      pj_updated_at = CURRENT_TIMESTAMP WHERE pj_id = '${projectId}'`
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
  deleteDataProjectByIdModel: (projectId) => {
    return new Promise((resolve, reject) => {
      const query = `
    DELETE FROM 
     project
     WHERE ?
    `
      db.query(query, { pj_id: projectId }, (error, results, _fields) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
          console.log(error)
        }
      })
    })
  }
}
