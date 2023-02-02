const { createNew, findAll, findById, updateById, findTotalEmployeeCount } = require('../../model/employee.model.js');
const ErrorHandler = require('../../utils/errorHandler.js');
const catchAsyncErrors = require('../../middleWare/catchAsyncErrors');
const ApiFeatures = require('../../utils/apiFeatures.js');
const cloudinary = require('cloudinary').v2;
const { EMPLOYEE_ADDED_SUCCESSFULLY, EMPLOYEE_FETCHED_SUCCESSFULLY, EMPLOYEE_NOT_FOUND, EMPLOYEE_UPDATED_SUCCESSFULLY, EMPLOYEE_DELETED_SUCCESSFULLY, SUCCESS, TOTAL_COUNT_FOUND } = require('../../utils/constants.js');

const createEmployee = catchAsyncErrors(async (req, res, next) => {
    if (!req.files.profileImage) {
        next(new ErrorHandler('Please upload profile image', 400))
    }
    const myCloud = await cloudinary.uploader.upload(req.files.profileImage.tempFilePath, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });
    const employee = await createNew({
        ...req.body,
        profileImage: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    res.status(200).json({
        type: SUCCESS,
        message: EMPLOYEE_ADDED_SUCCESSFULLY,
        employee
    })
})

const getAllEmployee = catchAsyncErrors(async (req, res, next) => {
    const totalCount = await findTotalEmployeeCount();
    const apiFeature = new ApiFeatures(findAll(), req.query).pagination(totalCount);
    const response = await apiFeature.query;
    res.status(200).json({
        type: SUCCESS,
        message: EMPLOYEE_FETCHED_SUCCESSFULLY,
        response, totalCount
    })
})

const getTotalEmployeeCount = catchAsyncErrors(async (req, res, next) => {
    const totalCount = await findTotalEmployeeCount();
    res.status(200).json({
        type: SUCCESS,
        message: TOTAL_COUNT_FOUND,
        totalCount
    })
})

const updateEmployee = catchAsyncErrors(async (req, res, next) => {
    let employee = await findById(req.params.id);
    if (!employee) {
        return next(new ErrorHandler(EMPLOYEE_NOT_FOUND, 400))
    }
    const newEmployee = { ...req.body }
    if (Boolean(req.files?.profileImage)) {
        const imageId = employee.profileImage.public_id;

        await cloudinary.uploader.destroy(imageId);

        const myCloud = await cloudinary.uploader.upload(req.files.profileImage?.tempFilePath, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newEmployee.profileImage = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    } else {
        newEmployee.profileImage = employee.profileImage
    }

    let updatedEmployee = await updateById(req.params.id, newEmployee)
    return res.status(200).json({
        type: SUCCESS,
        message: EMPLOYEE_UPDATED_SUCCESSFULLY,
        updatedEmployee,
    })
})

const deleteEmployee = catchAsyncErrors(async (req, res, next) => {
    let employee = await findById(req.params.id);
    if (!employee) {
        return next(new ErrorHandler(EMPLOYEE_NOT_FOUND, 400))
    }
    const imageId = employee.profileImage.public_id;

    await cloudinary.uploader.destroy(imageId);
    employee.remove();
    return res.status(200).json({
        type: SUCCESS,
        message: EMPLOYEE_DELETED_SUCCESSFULLY,
    })
})


module.exports = {
    createEmployee,
    getAllEmployee,
    updateEmployee,
    deleteEmployee,
    getTotalEmployeeCount
}