const router = require('express').Router()
const userModel = require('../modules/User')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin } = require('./verifyToken')
const CryptoJS = require('crypto-js')
const isValid = require('../helpers.js')

// UPDATE USER:
//Protected Area.
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  const id = req.params.id

  try {
    // const userData = await userModel.findById(id)
    if (req.body.username) {
      const userNameExist = await userModel.findOne({ username: req.body.username })
      if (userNameExist) {
        return res.status(422).json({ error: 'This username already exist.' })
      }

    }

    if (req.body.email) {
      const userEmailExist = await userModel.findOne({ email: req.body.email })
      if (userEmailExist) {
        return res.status(422).json({ error: 'This email already exist.' })
      }

    }

    // If user update the username
    // if (req.body.username && req.body.username === userData.username) {
    //   return res.status(422).json({ error: 'This username already exist.' })
    // }



    // if (req.body.email && req.body.email === userData.email) {
    //   return res.status(422).json({ error: 'This email already exist.' })
    // }


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
    res.status(500).json({ error: 'Could not update user', error: error })
  }

})


// DELETE USER:
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'User deleted!' })
  } catch (error) {
    res.status(500).json({ error: 'Could not delete user', error })
  }

})


// GET USER: Only admin can access a specific user!!
router.get('/find/:id', verifyTokenAdmin, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select('-passsword').select('-email')
    res.status(200).json(user)
  } catch (error) {
    res.status(403).json({ error: 'User not found.', error })
  }

})


// GET all users:
router.get('/find/all/:id', verifyTokenAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query ? await userModel.find().sort({ _id: -1 }) : await userModel.find();
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'User not found.', error })
  }

})




// GET users stats:
// return total number of users per month.
router.get('/stats', verifyTokenAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await userModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router