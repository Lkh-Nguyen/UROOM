const generateToken = require("../../utils/generateToken");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");

exports.loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (user.role == "CUSTOMER") {
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
  } else {
    return res.status(401).json({ MsgNo: "Email or password is incorrect" });
  }
};
exports.updateCustomerProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, phoneNumber, address, gender, birthDate, image } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ MsgNo: "User not found" });
    }

    if (user.role !== "CUSTOMER") {
      return res.status(403).json({ MsgNo: "Access denied" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ MsgNo: "Your email is not verified" });
    }

    // Cập nhật các trường
    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;
    user.gender = gender || user.gender;
    user.birthDate = birthDate || user.birthDate;

    if (image && image.public_ID && image.url) {
      user.image = image;
    }

    user.updatedAt = new Date();

    const updatedUser = await user.save();

    res.json({
      MsgNo: "Profile updated successfully",
      Data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ MsgNo: "Internal server error" });
  }
};
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({ MsgNo: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ MsgNo: "Current password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ MsgNo: "Confirm password does not match" });
    }
    
    user.password = newPassword
    user.updatedAt = new Date();
    await user.save();

    res.json({ MsgNo: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ MsgNo: "Internal server error" });
  }
};
