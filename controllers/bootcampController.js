// Files
const Bootcamp      = require('../models/Bootcamp')
const asyncHandler  = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')

// @desc    Get all bootcamps
// @route   GET /api/va/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async(req, res, next) => {
    const getBootcamps = await Bootcamp.find();

    res.status(200)
        .json({
            success: true,
            count: getBootcamps.length,
            data: {
                getBootcamps
            }
        })
})

// @desc    Get a bootcamps
// @route   GET /api/va/bootcamps/:id
// @access  Public
exports.getBootcampById = asyncHandler(async (req, res, next) => {
    const getBootcamp = await Bootcamp.findById(req.params.id);

    if(!getBootcamp) return next(new ErrorResponse(`Bootcamp not found with id: ${req.params.id}`, 404));

    res.status(200).json({
        success: true,
        data: {
            getBootcamp,
        },
    });
})

// @desc    Create a bootcamps
// @route   POST /api/va/bootcamps/
// @access  Private
exports.createBootcamp = asyncHandler(async(req, res, next) => {
    const createBootcamp = await Bootcamp.create(req.body)

    if (!createBootcamp) return next(new ErrorResponse(`Bootcamp not created`, 404));

    res.status(201)
        .json({
            success: true,
            data: {
                createBootcamp
            }
        })
})

// @desc    Update a bootcamps
// @route   PUT /api/va/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async(req, res, next) => {
    const updateBootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!updateBootcamp) return next(new ErrorResponse(`Bootcamp not updated`, 404));

    res.status(200).json({
      success: true,
      data: {
        updateBootcamp
      },
    });
})

// @desc    Delete a bootcamps
// @route   DELETE /api/va/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async(req, res, next) => {
    const deleteBootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if (!deleteBootcamp) return next(new ErrorResponse(`Bootcamp not deleted`, 404));

    res.status(200).json({
      success: true,
      data: {}
    });
})