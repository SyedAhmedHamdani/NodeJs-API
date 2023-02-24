const express = require('express');
const postControllers = require('../controllers/postControllers');
const router = express.Router();

router.route('/logs').post(postControllers.getUserLogs);
router.route('/all-logs').get(postControllers.getAllLogs);
router.route('/user').post(postControllers.getUser);
router.route('/closet').post(postControllers.getUserCloset);
router.route('/add-schedule').post(postControllers.addUserSchedule);


module.exports = router;