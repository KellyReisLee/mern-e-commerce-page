const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const userRoutes = require('./routes/user')


app.use(express.json())
app.use('/api/users', userRoutes)

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Database connected!!!');
}).catch((error) => {
  console.log(error);
})






app.listen(process.env.PORT, () => console.log(`Server running port ${process.env.PORT}`))