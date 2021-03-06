const { createHireModel, getDataHireByIdModel, updateDataHireByIdModel, deleteDataHireByIdModel, updateStatusHireByIdModel, getAllDataHirerModel, getHireByEnIdModel, getHireByProjectIdModel } = require('../models/hireModel')
module.exports = {
  createHire: async (req, res) => {
    try {
      const { enId, pjId, hrPrice, hrMessage, hrStatus } = req.body
      console.log(req.body)
      const result = await createHireModel(enId, pjId, hrPrice, hrMessage, hrStatus)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'Succes Add Hire'
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Submit Hire Failed'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: true,
        message: 'Internal Server Error!'
      })
      console.log(error)
    }
  },
  getDataHireById: async (req, res) => {
    try {
      const { hireId } = req.params
      console.log(req.params)
      console.log(hireId)
      const result = await getDataHireByIdModel(hireId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Hire with id ${hireId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data Hire with id ${hireId} not found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  updateDataHireById: async (req, res) => {
    try {
      const { hireId } = req.params
      const dataId = await getDataHireByIdModel(hireId)
      const dataUpdate = req.body
      console.log(req.body)
      if (dataId.length) {
        const result = await updateDataHireByIdModel(hireId, dataUpdate)
        console.log(result)
        if (result.affectedRows) {
          res.status(200).send({
            status: true,
            message: `Hire With ID ${hireId} has been update`
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
          message: `Hire with id ${hireId} not Found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  deleteDataHireById: async (req, res) => {
    try {
      const { hireId } = req.params
      const dataId = await getDataHireByIdModel(hireId)
      if (dataId.length) {
        const result = await deleteDataHireByIdModel(hireId)
        console.log(result)
        if (result.affectedRows) {
          res.status(200).send({
            status: true,
            message: `Hire With ID ${hireId} has been delete`
          })
        } else {
          res.status(400).send({
            status: false,
            message: 'Failed to delete Data '
          })
        }
      } else {
        res.status(400).send({
          success: false,
          message: `Hire with id ${hireId} not Found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  updateStatusHireById: async (req, res) => {
    try {
      const { hireId } = req.params
      const dataId = await getDataHireByIdModel(hireId)
      const { hrStatus } = req.body
      console.log(req.body)
      if (dataId.length) {
        const result = await updateStatusHireByIdModel(hireId, hrStatus)
        console.log(result)
        if (result.affectedRows) {
          res.status(200).send({
            status: true,
            message: `Status Hire With ID ${hireId} has been update`
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
          message: `Hire with id ${hireId} not Found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  getAllDataHire: async (_req, res, _next) => {
    try {
      const result = await getAllDataHirerModel()
      console.log(result)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Hire List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item Hire not found!'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Internal Server Error!'
      })
    }
  },
  getHireByEnId: async (req, res) => {
    try {
      const { engineerId } = req.params
      const result = await getHireByEnIdModel(engineerId)

      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Hire List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item hire not found!'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Internal Server Error!'
      })
    }
  },
  getHireByProjectId: async (req, res) => {
    try {
      const { pjId } = req.params

      const result = await getHireByProjectIdModel(pjId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'data hire:',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'data hire not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  }
}
