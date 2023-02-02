const { createNew, findAll, findById, updateById, findTotalTeamCount } = require('../../model/team.model.js');
const ErrorHandler = require('../../utils/errorHandler.js');
const catchAsyncErrors = require('../../middleWare/catchAsyncErrors');
const ApiFeatures = require('../../utils/apiFeatures.js');
const { SUCCESS, TEAM_ADDED_SUCCESSFULLY, TEAM_UPDATED_SUCCESSFULLY, TEAM_DELETED_SUCCESSFULLY, TEAM_FETCHED_SUCCESSFULLY, TEAM_NOT_FOUND, TOTAL_COUNT_FOUND } = require('../../utils/constants.js');

const createTeam = catchAsyncErrors(async (req, res, next) => {
    const team = await createNew(req.body);

    res.status(200).json({
        type: SUCCESS,
        message: TEAM_ADDED_SUCCESSFULLY,
        team
    })
})

const getAllTeam = catchAsyncErrors(async (req, res, next) => {
    const totalCount = await findTotalTeamCount();
    const apiFeature = new ApiFeatures(findAll(), req.query).filter().pagination(totalCount);
    const response = await apiFeature.query;
    res.status(200).json({
        type: SUCCESS,
        message: TEAM_FETCHED_SUCCESSFULLY,
        response, totalCount
    })
})

const getTotalTeamCount = catchAsyncErrors(async (req, res, next) => {
    const totalCount = await findTotalTeamCount();
    res.status(200).json({
        type: SUCCESS,
        message: TOTAL_COUNT_FOUND,
        totalCount
    })
})

const updateTeam = catchAsyncErrors(async (req, res, next) => {
    let team = await findById(req.params.id);
    if (!team) {
        return next(new ErrorHandler(TEAM_NOT_FOUND, 400))
    }
    let updatedTeam = await updateById(req.params.id, req.body)
    return res.status(200).json({
        type: SUCCESS,
        message: TEAM_UPDATED_SUCCESSFULLY,
        updatedTeam,
    })
})

const deleteTeam = catchAsyncErrors(async (req, res, next) => {
    let team = await findById(req.params.id);
    if (!team) {
        return next(new ErrorHandler(TEAM_NOT_FOUND, 400))
    }
    team.remove();
    return res.status(200).json({
        type: SUCCESS,
        message: TEAM_DELETED_SUCCESSFULLY,
    })
})


module.exports = {
    createTeam,
    getAllTeam,
    updateTeam,
    deleteTeam,
    getTotalTeamCount
}