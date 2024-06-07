const router = require('express').Router()
const userModel = require('../modules/User.js')
const CryptoJS = require('crypto-js')
const isValid = require('../helpers.js')
const jwt = require('jsonwebtoken')


// REGISTER:
router.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {

    if (!userModel || !email || !password || !confirmPassword) {
      return res.status(500).json({ error: 'All fields are required!' })
    }

    const userNameExist = await userModel.findOne({ username });
    if (userNameExist) {
      return res.status(500).json({ error: 'This username already exist. Try a different one.' })
    }

    if (username.length < 4) {
      return res.status(500).json({ error: 'The username must have at least 4 characters.' })
    }

    const userEmailExist = await userModel.findOne({ email });
    if (userEmailExist) {
      return res.status(500).json({ error: 'This email already exist. Try a different one.' })
    }

    if (password.length < 8 && !isValid(password)) {
      return res.status(500).json({ error: 'Password must contain minimum 8 characters, including: 1 lowercase letter, 1 special character(@$!%*?&), 1 capital letter and at least 1 number(0-9)' })
    }

    if (password !== confirmPassword) {
      return res.status(500).json({ error: 'Password and Confirm Password have to match!' })
    }



    const newUser = await userModel.create({
      username: username, email: email, password: CryptoJS.AES.encrypt(password, process.env.SECRET).toString()
    })

    res.status(201).json(newUser)

  } catch (err) {
    res.status(500).json(err)
  }
})


// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;


  try {

    if (!email || !password) {
      return res.status(500).json({ error: 'All fields are required!' })
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Email not found. Try again!' })
    }
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET)
    const passwordUser = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (passwordUser !== password) {
      return res.status(401).json({ error: 'Password is wrong. Try again!' })
    }

    const accessToken = jwt.sign({
      id: user._id, isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, { expiresIn: '1h' })



    const userData = await userModel.findOne({ email }).select('-password')
    const completeUserData = userData._doc;

    res.status(201).json({ ...completeUserData, accessToken, message: 'User Logged In Successfully!' })

  } catch (error) {
    res.status(500).json(error)
  }
})




// LOGOUT
router.get('/logout', async (req, res) => {

  try {
    res.clearCookie()
    return res.status(200).json({ message: 'Successfully Logout' });
  } catch (error) {
    res.status(500).json({ error: 'Could not logout.' })
  }


})
module.exports = router