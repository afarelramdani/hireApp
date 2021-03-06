const { createSkillModel, getDataSkillByIdModel, updateDataSkillByIdModel, deleteDataSkillByIdModel, getAllDataSkillModel, getDataSkillByEnIdModel } = require('../models/skillModel')
module.exports = {
  createSkill: async (req, res) => {
    try {
      const dataCreate = req.body
      const result = await createSkillModel(dataCreate)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'Succes To Add skill'
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Submit skill Failed'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: true,
        message: 'Internal Server Error!'
      })
    }
  },
  getDataSkillById: async (req, res) => {
    try {
      const { skillId } = req.params
      console.log(req.params)
      console.log(skillId)
      const result = await getDataSkillByIdModel(skillId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `skill with id ${skillId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data skill with id ${skillId} not found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  updateDataSkillById: async (req, res) => {
    try {
      const { skillId } = req.params
      const dataId = await getDataSkillByIdModel(skillId)
      const dataUpdate = req.body
      console.log(req.body)
      if (dataId.length) {
        const result = await updateDataSkillByIdModel(skillId, dataUpdate)
        console.log(result)
        if (result.affectedRows) {
          res.status(200).send({
            status: true,
            message: `skill With ID ${skillId} has been update`
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
          message: `skill with id ${skillId} not Found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  deleteDataSkillById: async (req, res) => {
    try {
      const { skillId } = req.params
      const dataId = await getDataSkillByIdModel(skillId)
      if (dataId.length) {
        const result = await deleteDataSkillByIdModel(skillId)
        console.log(result)
        if (result.affectedRows) {
          res.status(200).send({
            status: true,
            message: `skill With ID ${skillId} has been delete`
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
          message: `skill with id ${skillId} not Found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  getAllSkill: async (_req, res, _next) => {
    try {
      const result = await getAllDataSkillModel()
      console.log(result)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Skill List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item Skill not found!'
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
  getSkillByEnId: async (req, res) => {
    try {
      const { engineerId } = req.params
      const result = await getDataSkillByEnIdModel(engineerId)

      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Skill List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item Skill not found!'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Internal Server Error!'
      })
    }
  }
}
