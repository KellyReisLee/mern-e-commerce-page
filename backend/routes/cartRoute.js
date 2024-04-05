const router = require('express').Router()
const Cart = require('../modules/Cart')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAdmin } = require('./verifyToken')


//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json({ message: 'Cart created successfully!', savedCart });
  } catch (err) {
    res.status(500).json(err);
  }
});




// UPDATE A CART:
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  const { id } = req.params;


  try {
    const updatedCart = await Cart.findByIdAndUpdate(id, {
      $set: req.body
    }, { new: true })
    res.status(200).json({ message: 'Product added to cart.', updatedCart })

  } catch (error) {
    res.status(500).json({ error: 'Could not add to cart.', error })

  }
})



// DELETE CART:
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Product deleted!' })
  } catch (error) {
    res.status(500).json({ error: 'Could not delete product', error })
  }

})


//GET USER CART
router.get("/find/:userId", verifyTokenAdmin, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.body.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Could not find cart.', error });
  }
});


// GET ALL CARTS:
router.get('/', verifyTokenAdmin, async (req, res) => {
  try {
    const allCarts = await Cart.find();
    res.status(200).json(allCarts)
  } catch (error) {
    res.status(500).json({ error: 'Could not find carts.', error })
  }


})


module.exports = router