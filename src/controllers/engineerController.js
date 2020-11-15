const { createHireEngineerModel, getAllDataEngineerModel, getDataEngineerByIdModel, updateEngineerModel, searchEngineerModel, getFilterEngineer } = require('../models/engineerModel')

module.exports = {
  createHireEngineer: async (req, res) => {
    try {
      const { enJobTittle, enJobType, enOrigin, enDesc, enFtProfile } = req.body
      console.log(req.body)
      const result = await createHireEngineerModel(enJobTittle, enJobType, enOrigin, enDesc, enFtProfile)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'Succes Add engineer'
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Submit engineer Failed'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: true,
        message: 'Internal Server Error!'
      })
    }
  },
  getAllEngineer: async (_req, res, _next) => {
    try {
      const result = await getAllDataEngineerModel()
      console.log(result)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Engineer List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item engineer not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal Server Error!'
      })
    }
  },
  getDataEngineerById: async (req, res, next) => {
    try {
      const { engineerId } = req.params
      console.log(req.params)
      console.log(engineerId)
      const result = await getDataEngineerByIdModel(engineerId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Engineer with id ${engineerId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data Engineer with id ${engineerId} not found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  updateEngineer: async (req, res) => {
    try {
      const { engineerId } = req.params
      const { enJobTittle, enJobType, enOrigin, enDesc, enFtProfile } = req.body

      if (enJobTittle.trim() && enJobType.trim() && enOrigin && enDesc.trim() && enFtProfile.trim()) {
        const result = await getDataEngineerByIdModel(engineerId)
        if (result.length) {
          const result = await updateEngineerModel(engineerId, enJobTittle, enJobType, enOrigin, enDesc, enFtProfile)
          if (result.affectedRows) {
            res.status(200).send({
              status: true,
              message: `Engineer With ID ${engineerId} has been update`
            })
          } else {
            res.status(400).send({
              status: false,
              message: 'Failed to Update Data '
            })
          }
        } else {
          res.status(400).send({
            success: false,
            message: `Engineer with id ${engineerId} not Found`
          })
        }
      } else {
        res.send({
          success: false,
          message: 'All Field must be filled!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  searchEngineer: async (req, res) => {
    let { search, limit, page } = req.query
    let searchValue = ''
    let searchKey = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'ac.acname'
      searchValue = search || ''
    }

    if (!limit) {
      limit = 50
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    searchEngineerModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Engineer List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item Engineer not found!'
        })
      }
    })
  },

  getFilterEngineer: async (req, res, _next) => {
    let { filter, limit, page } = req.query
    console.log(filter)
    console.log(req.query)
    if (!limit) {
      limit = 10
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const data = {
      filter: filter,
      limit: limit,
      offset: (page - 1) * limit
    }

    try {
      const result = await getFilterEngineer(data)

      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Project succes filter ',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Data failed to filter'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  }
}
