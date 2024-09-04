const express = require('express');
const homeController = require('../controllers/home-controller');

const router = express.Router();
//Middleware for id param
// router.param('id', homeController.checkParamId);
router.route('/home-stats').get(homeController.getHomesStats);
router
  .route('/')
  .get(homeController.getAllHomes)
  .post(homeController.createHome);
router
  .route('/:id')
  .get(homeController.getHome)
  .patch(homeController.updateHome)
  .delete(homeController.deleteHome);

module.exports = router;
