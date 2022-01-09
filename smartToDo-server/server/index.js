const express = require('express');
const app = express();
const connectToMongo = require('./Database/MongoConnection');
const port = 5000;
const cors = require('cors');
//Connecting to our MongoDB 
connectToMongo();
app.use(cors())
app.use(express.json())

// sample route
app.use('/user',require('./routes/user'));
app.use('/firstlist',require('./routes/task1'));
app.use('/secondlist',require('./routes/task2'));
app.use('/thirdlist',require('./routes/task3'));



app.listen(port, () => {
  console.log(`smartToDo app listening at http://localhost:${port}`)
})