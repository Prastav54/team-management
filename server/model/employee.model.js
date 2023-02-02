const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please Enter First Name']
    },
    middleName: String,
    lastName: {
        type: String,
        required: [true, 'Please Enter Last Name']
    },
    profileImage:
    {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    birthDate: {
        type: Date,
        required: [true, 'Please Enter Birth Date']
    },
    gender: {
        type: String,
        required: [true, 'Please Enter Gender']
    },
    address: String,
    phoneNumber: String,
    emailAddress: String,
    startsAt: String,
    endsAt: String,
    position: {
        type: String,
        required: [true, 'Please Enter Position Type for Employees']
    },
    team: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team'
    },
    billableHours: Number,
})

const Employee = mongoose.model("Employee", employeeSchema)

const createNew = async (employeeDetail) => {
    return Employee.create(employeeDetail);
}

const findAll = () => {
    return Employee.find().populate("team", "name");
}

const findById = async (id) => {
    return Employee.findById(id);
}

const updateById = (id, body) => {
    return Employee.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    })
}

const findTotalEmployeeCount = () => {
    return Employee.countDocuments()
}

module.exports = {
    createNew,
    findAll,
    findById,
    updateById,
    findTotalEmployeeCount
}