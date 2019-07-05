const express = require('express');
const helmet = require('helmet');

const app = express();
const { PORT } = process.env;
const port = PORT || 8000; // Default to 8000 if env not set
const routes = require('./routes/routes');

app.use('/', [helmet(), routes]);

app.listen(port, () => console.log(`Listening on port ${port}`));
