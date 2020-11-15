const { createHireAccountModel, getAllDataAccountModel, getAccountByIdModel, deleteAccountModel, updateAccountModel } = require('../models/accountModel')
module.exports = {
  createHireAccount: async (req, res) => {
    try {
      const { acName, acEmail, acNoHp, acPassword, acLevel, cnName, cnPosition } = req.body
      const result = await createHireAccountModel(acName, acEmail, acNoHp, acPassword, acLevel, cnName, cnPosition)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'Succes Add Account'
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Failed Add Account'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: true,
        message: 'Internal Server Error!'
      })
    }
  },
  getAllData: (req, res) => {
    let { search, limit, page } = req.query
    let searchKey = ''
    let searchValue = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'ac_name'
      searchValue = search || ''
    }
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

    const offset = (page - 1) * limit

    getAllDataAccountModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Project List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item project not found!'
        })
      }
    }
    )
  },
  getAccountById: async (req, res) => {
    try {
      const { accountId } = req.params
      console.log(req.params)
      const result = await getAccountByIdModel(accountId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Project with id ${accountId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data project with id ${accountId} not found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  deleteAccount: async (req, res) => {
    try {
      const { accountId } = req.params

      const results = await getAccountByIdModel(accountId)
      if (results.length) {
        const result = await deleteAccountModel(accountId)
        if (result.affectedRows) {
          res.status(200).send({
            succes: true,
            message: `Item Project id ${accountId} has been Delete`
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Item Project Failed to Delete'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: `Data project with ID ${accountId} not found`
        })
      }
    } catch (error) {
      res.status(404).send({
        success: false,
        message: 'Data project not Found'
      })
    }
  },
  updateAccount: async (req, res) => {
    try {
      const { accountId } = req.params
      const { acName, acEmail, acNoHp, acPassword, acLevel } = req.body

      if (acName.trim() && acEmail.trim() && acNoHp && acPassword.trim() && acLevel.trim()) {
        const result = await getAccountByIdModel(accountId)
        if (result.length) {
          const result = await updateAccountModel(accountId, req.body)
          if (result.affectedRows) {
            res.status(200).send({
              status: true,
              message: `Project With ID ${accountId} has been update`
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
            message: `Project with id ${accountId} not Found`
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
  }
}
