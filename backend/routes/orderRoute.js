const router = require('express').Router()
const Order = require('../modules/Order')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin } = require('./verifyToken')



//CREATE ORDER:
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({ message: "Order created successfully", savedOrder });
  } catch (err) {
    res.status(500).json(err);
  }
});


// UPDATE A ORDER:
router.put('/:id', verifyTokenAdmin, async (req, res) => {


  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
      {
        $set: req.body,
      },
      { new: true });

    if (!updatedOrder) {
      return res.status(500).json({ error: 'Could not update order.Hello' });
    }
    res.status(200).json({ message: 'Order updated.', updatedOrder });

  } catch (error) {
    res.status(500).json({ message: 'Could not update order.', error });
  }
});




// DELETE ORDER:
router.delete('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
      return res.status(404).json({ error: 'Could not find order.' })
    }

    res.status(200).json({ message: 'Order deleted Successfully!' })
  } catch (error) {
    res.status(500).json({ error: 'Could not delete order.', error })
  }

})


//GET USER ORDER:
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {

  try {
    const order = await Order.findOne({ userId: req.params.userId });

    if (!order) {
      return res.status(404).json({ error: 'Could not find order.' })
    }
    const finalData = order._doc
    res.status(200).json({ message: 'User found!', ...finalData });
  } catch (error) {
    res.status(500).json({ error: 'Could not find order.', error });
  }
});


// GET ALL ORDERS:
router.get('/', verifyTokenAdmin, async (req, res) => {
  try {
    const allOrders = await Order.find();

    res.status(200).json(allOrders)
  } catch (error) {
    res.status(500).json({ error: 'Could not find orders.', error })
  }


})


// GET MONTHLY INCOME:
router.get('/income', verifyTokenAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
  try {
    // pegue data com 2 meses de antecedência.
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income)
  } catch (error) {
    res.status(500).json({ error: 'Could not find income.', error })
  }


})



module.exports = router