// Files
const asyncHandler  = require('../middlewares/async')
const Bootcamp      = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const geocoder      = require('../utils/geocoder')

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async(req, res, next) => {
    let query
    let queryStr = JSON.stringify(req.query)

    queryStr            = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`) // finding mongoos query operaters in url params (gt|gte|lt|lte|in)
    query               = await Bootcamp.find(JSON.parse(queryStr))
    const getBootcamps  = query

    if (!getBootcamps) return next(new ErrorResponse(`Bootcamps not found with param: ${req.query}`, 404));

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
// @route   GET /api/v1/bootcamps/:id
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

// @desc    Get bootcamp(s) within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
exports.getBootcampByRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params
    const location              = await geocoder.geocode(zipcode)
    const lat                   = location[0].latitude
    const long                  = location[0].longitude
    const radius                = distance / 6378 // Calculating radius - Earth Radius = 6378km

    const getBootcampByRadius = await Bootcamp.find({
        location: { 
            $geoWithin: { $centerSphere: [[long, lat], radius] }
        }
    })

    res.status(200)
        .json({
            success: true,
            count: getBootcampByRadius.length,
            data: {
                getBootcampByRadius
            }
        })
})

// @desc    Create a bootcamp
// @route   POST /api/v1/bootcamps/
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

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
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

// @desc    Delete a bootcamp
// @route   DELETE /api/v/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async(req, res, next) => {
    const deleteBootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if (!deleteBootcamp) return next(new ErrorResponse(`Bootcamp not deleted`, 404));

    res.status(200).json({
      success: true,
      data: {}
    });
})
