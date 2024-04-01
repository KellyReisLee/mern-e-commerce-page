const router = require('express').Router()
const userModel = require('../modules/User')
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken')
const CryptoJS = require('crypto-js')
const isValid = require('../helpers.js')

// Update user:
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  const id = req.params.id

  try {
    const userData = await userModel.findById(id)

    // If user update the username
    if (req.body.username && req.body.username === userData.username) {
      return res.status(422).json({ error: 'This username already exist.' })
    }


    if (req.body.email && req.body.email === userData.email) {
      return res.status(422).json({ error: 'This email already exist.' })
    }


    // If user update the password


    if (req.body.password && !isValid(req.body.password)) {
      return res.status(422).json({ error: 'Password must contain minimum 8 characters, including: 1 lowercase letter, 1 special character(@$!%*?&), 1 capital letter and at least 1 number(0-9).' })
    }

    if (req.body.password && req.body.password !== req.body.confirmPassword) {
      return res.status(500).json({ error: 'Password and Confirm Password have to match!' })
    }

    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString()
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })

    res.status(200).json({ message: 'User Updated', updatedUser })
  } catch (error) {
    res.status(500).json({ error: 'Could not update user', error })
  }

})



router.delete('/:id', async (req, res) => {

})



module.exports = router