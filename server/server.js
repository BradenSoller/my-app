const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5002;

// Middleware Includes



// Route Includes

const animeRouter = require('./routes/template.router.js')

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));



// Routes

app.use('/api/anime', animeRouter)

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
