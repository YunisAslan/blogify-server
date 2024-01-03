const UserModel = require("../models/user-model");
const userValidationSchema = require("../validations/user-validation");

const UserAuthMiddleware = async (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  const { username, email } = req.body;
  
  // same email & username validation
  const existedUsername = await UserModel.findOne({ username });
  const existedEmail = await UserModel.findOne({ email });

  if (existedUsername || existedEmail) {
    res.status(409).send({
      message: "You cannot choose same username or email!",
    });

    return;
  }

  if (!error) {
    next();
  } else {
    return res.send({
      message: error?.message,
    });
  }
};

module.exports = UserAuthMiddleware;
