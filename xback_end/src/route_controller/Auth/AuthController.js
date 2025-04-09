const generateToken = require("../../utils/generateToken");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");

exports.loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  
  if(user.role == "CUSTOMER"){
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ MsgNo: "Email or password is incorrect" });
    }
    if (!user.isVerified) {
      return res.status(403).json({ MsgNo: "Your email is not verified" });
    }
    const token = generateToken(user);
    res.json({
      Data: {
        token: token,
        user: user,
      },
    });
  }else{
    return res.status(401).json({ MsgNo: "Email or password is incorrect" })
  }
};
