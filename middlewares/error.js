const  errorHandler = (err,req,res,next) =>{
    statusCode = err.statusCode || 500
    err.status = err.status || "error";

    res.status(statusCode).json({
        status:err.status,
        message:err.message
    });
};

module.exports = errorHandler;


