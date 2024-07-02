
function errorHandler(err, req, res, next){
    return res.status(500).json({message: err, success: false})
}

module.exports.errorHandler = errorHandler;