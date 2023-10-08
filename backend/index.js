const express = require('express');
const Connection = require('./Database/db')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB

app.use(express());
app.use(cors());
app.use(bodyParser.json());
app.use('/tasks', require('./Router/route'));
Connection();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
