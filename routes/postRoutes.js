const express = require('express');
const postControllers = require('../controllers/postControllers');
const router = express.Router();

router.route('/logs').post(postControllers.getUserLogs);
router.route('/all-logs').get(postControllers.getAllLogs);
router.route('/user').post(postControllers.getUser);
router.route('/closet').post(postControllers.getUserCloset);
router.route('/add-schedule').post(postControllers.addUserSchedule);
router.route('/get-schedule').post(postControllers.getUserSchedule);
router.route('/add-user').post(postControllers.signupNewUser);
router.route('/add-card').post(postControllers.addUserCard);
router.route('/get-subs').post(postControllers.addNewSubscription);
router.route('/add-payment-method').post(postControllers.addNewPaymentMethod);
router.route('/attach-payment-method').post(postControllers.attachNewPaymentMethod);
router.route('/get-all-product').post(postControllers.getStripeProduct);
router.route('/get-all-subscription').post(postControllers.getStripeSubscription);
router.route('/cancel-subscription').post(postControllers.cancelStripeSubscription);
router.route('/link-closet').post(postControllers.linkCloset);
router.route('/update-link-closet').post(postControllers.updateLinkCloset);

module.exports = router;