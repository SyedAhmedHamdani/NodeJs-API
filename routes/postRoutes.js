const express = require('express');
const postControllers = require('../controllers/postControllers');
const router = express.Router();

router.route('/logs').get(postControllers.getUserLogs);
router.route('/all-logs').get(postControllers.getAllLogs);
router.route('/user').get(postControllers.getUser);
router.route('/closet').get(postControllers.getUserCloset);


module.exports = router;