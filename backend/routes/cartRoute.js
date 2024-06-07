const router = require('express').Router()
const cartModel = require('../modules/Cart')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAdmin } = require('./verifyToken')


//CREATE
router.post("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const cart = await cartModel.findOne({ userId: id });
  console.log(cart, id)

  if (cart) {
    return res.json({ error: 'This cart already exist.' })
  }

  const newCart = new cartModel(req.body);
  //console.log(req.body.products)

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
  const { products } = req.body; // Destructure products from req.body

  try {
    // Find the cart by user ID
    let cart = await cartModel.findOne({ userId: id });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new cartModel({ userId: id, products });
      await cart.save();
      return res.status(201).json({ message: 'Cart created successfully.', cart });
    }

    // Log the cart and products for debugging
    console.log('Existing cart:', cart);
    console.log('Updated products:', products);

    // Update the cart with new products
    cart.products = products;
    await cart.save();

    res.status(200).json({ message: 'Cart Updated!', cart });
  } catch (err) {
    // Log the error for debugging
    console.log('Validation error:', err);
    res.status(500).json({ error: 'Could not update cart.', details: err.message });
  }
});




// DELETE CART:
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  const { id } = req.params
  try {
    await cartModel.findByIdAndDelete(id)
    res.status(200).json({ message: 'Product deleted!' })
  } catch (error) {
    res.status(500).json({ error: 'Could not delete product', error })
  }

})


//GET USER CART
router.get("/find/:userId", verifyTokenAdmin, async (req, res) => {

  const { userId } = req.params
  //console.log(userId)

  try {
    const cart = await cartModel.findOne({ userId: req.body.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Could not find cart.', error });
  }
});


// GET ALL CARTS:
router.get('/', verifyTokenAdmin, async (req, res) => {
  try {
    const allCarts = await cartModel.find();
    res.status(200).json(allCarts)
  } catch (error) {
    res.status(500).json({ error: 'Could not find carts.', error })
  }


})


module.exports = router