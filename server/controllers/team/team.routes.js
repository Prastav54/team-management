const express = require('express');
const { getAllTeam, createTeam, updateTeam, deleteTeam, getTotalTeamCount } = require('./team.controller.js');

const router = express.Router();

router.route("/").get(getAllTeam);
router.route("/new").post(createTeam);
router.route("/:id").put(updateTeam).delete(deleteTeam);
router.route('/total').get(getTotalTeamCount);


module.exports = router;