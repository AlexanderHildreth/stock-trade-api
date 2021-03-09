const customResults = (model, populate) => async(req, res, next) => {
    let query
    const reqQuery = { ...req.query }
    const removeFields = ['select', 'sort', 'limit', 'page']
    removeFields.forEach(params => delete reqQuery[params])
    
    let queryStr = JSON.stringify(reqQuery)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`) // finding mongoos query operaters in url params (gt|gte|lt|lte|in)
    query = model.find(JSON.parse(queryStr))

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('-timestamp')
    }

    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 15
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await model.countDocuments(JSON.parse(queryStr))
    query = query.skip(startIndex).limit(limit)
    
    if(populate) {
        query = query.populate(populate)
    }
    
    const results = await query
    
    const pagination = {}
        if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
       
    }
    
    if (startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit
        }
    }

    res.customResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    }
    
    next()
}

module.exports = customResults