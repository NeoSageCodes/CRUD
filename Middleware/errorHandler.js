// Error Handling Middleware - Function Declaration
function serverError (err,req,res,next){
    console.log(err);

    res.status(500).json({ message: "Internal server error" });
}

// Normal 404 Middleware as Function Expression
const notFound = function (req,res) {
    res.status(404).json({message: "Route Not Found"})
}

module.exports ={serverError, notFound}