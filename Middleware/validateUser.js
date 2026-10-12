function validate (req,res,next) {
    const {name, gender} = req.body;

    const nameDataType = typeof(name);
    const genderDataType = typeof(gender);
    if (nameDataType !== "string" || genderDataType !== "string") {
        return res.status(400).json({
          message: "User Name / Gender must be specified and must be a conventional name / gender",
        });
    }

    const trimmedName = name.trim();
    const trimmedGender = gender.trim();

    if (!trimmedName) {
        res.status(400).json({
            message: "User Name must be specified and must be a conventional name"
        });
    } else if (!trimmedGender) {
      res.status(400).json({
        message: "User Gender must be specified and must be a conventional gender",
      });
    } else {
      next();
    }

};

module.exports = {validate}