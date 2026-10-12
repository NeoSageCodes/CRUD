// Authentication Middleware
const checkApiKey = (req,res,next) => {
    // Getting the API key from the request headers using bracket notation
    const apiKey = req.headers["x-api-key"];

    // Authenticating
    if (apiKey === "secret123") {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}


// Exporting
module.exports = {checkApiKey}