const errorHandler = (error,req,res,next)=>
{
    console.log({
        "path": req.url,
        "error name": error.name,
        "error message": error.message,
    })

    switch(error.name)
    {
        case "CastError":
            res.status(400).end("<h1>This is a bad request; the id is malformed. please enter good formated id.</h1>");
            break;
        case "ValidationError":
            res.status(400).json(error.message)
            break;
        default:
            res.send("<h1>No handeled message</h1>");
    }
    next();
}

module.exports = errorHandler;