// Express and route imports.
const router = require('express').Router();
const apiRoutes = require('./api');

// Route setup, example: http://localhost:3001/api/...
router.use('/api', apiRoutes);
router.use((req, res) => res.send('Wrong route!'));

//Express export.
module.exports = router;