const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { userModel } = require('../models/user')

const signUserUp = async (req, res) => {
    try {
        const {name , email , password} = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 8);

        await userModel.create({
            name,
            email,
            passwordHash: hashedPassword,
            createdAt: Date.now(),
        });

        res.status(201).json({ msg: "User created successfully!" });
    } catch (error) {
    console.error(error);
    res.status(403).json({ msg: "Signup failed, check credentials." });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(403).json({ msg: "User not found" });
        }

        const matchedPass = await bcrypt.compare(password, user.passwordHash);

    if (!matchedPass) {
      return res.status(403).json({ msg: "Wrong password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET , { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    console.error("LOGIN ERROR:", error); // 🚨 LOG THE ERROR WITH A LABEL
    res.status(403).json({ msg: "Login failed - Check server console for details." });
  }
}

module.exports = { signUserUp, userLogin };