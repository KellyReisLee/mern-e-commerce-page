const router = require('express').Router()
const userModel = require('../modules/User')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin } = require('./verifyToken')
const CryptoJS = require('crypto-js')
const isValid = require('../helpers.js')

// UPDATE USER:
//Protected Area.

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  const id = req.params.id;
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString();
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User updated!', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while updating the user.', details: err.message });
  }
});




// DELETE USER:
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  const id = req.params.id;
  try {
    await userModel.findByIdAndDelete(id)
    res.status(200).json({ message: 'User deleted!' })
  } catch (error) {
    res.status(500).json({ error: 'Could not delete user', error })
  }

})


// GET USER: Only admin can access a specific user!!
router.get('/find/:id', verifyTokenAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id).select('-password')
    res.status(200).json(user)
  } catch (error) {
    res.status(403).json({ error: 'User not found.', error })
  }

})


// GET all users:
router.get('/', verifyTokenAdmin, async (req, res) => {
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