const router = require('express').Router()
const Product = require('../modules/Product')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAdmin } = require('./verifyToken')

// CREATE A PRODUCT:
router.post('/', verifyTokenAdmin, async (req, res) => {
  const newProduct = new Product(req.body)


  try {
    const saveProducts = await newProduct.save();
    res.status(200).json({ message: 'You saved a product.', saveProducts })

  } catch (error) {
    res.status(500).json({ error: 'Could not create a new product.', error })

  }
})



// UPDATE A PRODUCT:
router.put('/:id', verifyTokenAdmin, async (req, res) => {
  const { id } = req.params;
  const data = req.body;


  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      data
    }, { new: true })
    res.status(200).json({ message: 'You saved a product.', updatedProduct })

  } catch (error) {
    res.status(500).json({ error: 'Could not update product.', error })

  }
})



// DELETE PRODUCT:
router.delete('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Product deleted!' })
  } catch (error) {
    res.status(500).json({ error: 'Could not delete product', error })
  }

})


//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET ALL PRODUCTS:
router.get('/', async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(2)
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory]
        }
      })
    } else {
      products = await Product.find()
    }
    res.status(200).json(products)

  } catch (error) {
    res.status(500).json({ error: 'Could not find products', error })
  }


})


module.exports = router