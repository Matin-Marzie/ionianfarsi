import express from 'express'
import employeesController from '../../controllers/employeesController.js'
import verifyJWT from '../../middleware/verifyJWT.js'

const router = express.Router()


router.route('/')
    .get(verifyJWT, employeesController.getAllEmployees)

    .post(employeesController.createNewEmployee)

    .put(employeesController.updateEmployee)

    .delete(employeesController.deleteEmployee)

router.route('/:id')
    .get(employeesController.getEmployee)

export default router;