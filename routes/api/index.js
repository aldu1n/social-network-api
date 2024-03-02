// Express and route imports.
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// Routes setup.
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Express export.
module.exports = router;