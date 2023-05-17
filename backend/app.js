const express = require('express');

const app = express();

const todoRouter = require('./routes/todo');
const userRouter = require('./routes/user');

const port = 3010;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port} 🚀🚀🚀`);
});
