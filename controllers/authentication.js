const { authentication, random } = require('../Helpers/index');
const User = require("../models/UserSchema");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }
  
    const user = await User.findOne({ 'email':email }).select('+salt +password');

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.salt, password);
    
    if (user.password != expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('YashKumarMishra-auth', user.sessionToken, {
      expires: new Date (Date.now() + 25892000000),
      httpOnly: true, sameSite: 'None', secure: true,
      });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

 const register = async (req, res) => {
  try {
    const { email, password} = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    const existingUser = await User.findOne({'email' : email });
  
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await new User({
        email,
          salt,
          password: authentication(salt, password),
      }).save().then((user) => user.toObject())
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

module.exports={login,register};