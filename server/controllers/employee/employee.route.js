const express = require('express');
const { getAllEmployee, createEmployee, updateEmployee, deleteEmployee, getTotalEmployeeCount } = require('./employee.controller');

const router = express.Router();

router.route("/").get(getAllEmployee);
router.route("/new").post(createEmployee);
router.route("/:id").put(updateEmployee).delete(deleteEmployee);
router.route("/total").get(getTotalEmployeeCount);


module.exports = router;