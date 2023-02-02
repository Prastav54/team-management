const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Team Name']
    },
    password: {
        type: String,
        required: [true, 'Please Enter Team Password']
    },
    members: Array, 
    billableHours: Number,
})

const Team = mongoose.model("Team", teamSchema)

const createNew = async (teamDetail) => {
    return Team.create(teamDetail);
}

const findAll = () => {
    return Team.find();
}

const findById = async (id) => {
    return Team.findById(id);
}

const updateById = (id, body) => {
    return Team.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    })
}

const findTotalTeamCount = () => {
    return Team.countDocuments()
}

module.exports = {
    createNew,
    findAll,
    findById,
    updateById,
    findTotalTeamCount
}