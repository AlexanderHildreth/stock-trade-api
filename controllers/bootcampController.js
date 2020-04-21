// @desc    Get all bootcamps
// @route   GET /api/va/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
    // const getBootcamps = Bootcamps.find();

    res.status(200)
        .json({
            status: 'success',
            // results: getBootcamps.length,
            // data: {
            //     getBootcamps
            // }
        })
}

// @desc    Get a bootcamps
// @route   GET /api/va/bootcamps/:id
// @access  Public
/*exports.getBootcamp = (req, res, next) => {
    const getBootcamps = Bootcamps.find({_id: req.params.id});

    res.status(200).json({
        status: 'success',
        flash: flashArr,
        results: getBootcamps.length,
        data: {
            getBootcamps
        }
    })
}*/

// @desc    Create a bootcamps
// @route   POST /api/va/bootcamps/
// @access  Private
exports.createBootcamp = (req, res, next) => {

}

// @desc    Update a bootcamps
// @route   PUT /api/va/bootcamps/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {

}

// @desc    Delete a bootcamps
// @route   DELETE /api/va/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {

}