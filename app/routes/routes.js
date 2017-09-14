var express = require('express');
//var PollsCtrl = require('../api_controllers/polls_ctrl.js');
var ctrlAuth = require('../controllers/authentication.js');
var ctrlInventoryItem = require('../controllers/inventoryItem.js');
//var ctrlProfile = require('../api_controllers/profile.js');
var jwt = require('jsonwebtoken');
require('dotenv').config();

var router = express.Router();

router.post('/user/login', ctrlAuth.login);
router.post('/user/register', ctrlAuth.register);
//router.get('/polls' ,PollsCtrl.findPolls);
//router.get('/poll/:id' ,PollsCtrl.findPollById);
//router.put('/polls/:id',PollsCtrl.updatePoll);

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token,process.env.SECRET , function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});



router.route('/item/register').post(ctrlInventoryItem.registerItem);
router.route('/item/:id').get(ctrlInventoryItem.findItemById);
router.route('/item').get(ctrlInventoryItem.findAll);
//router.route('/polls/:username').get(PollsCtrl.findUserPolls);
//router.get('/user/profile/:username', ctrlProfile.profileRead);

module.exports = router;
