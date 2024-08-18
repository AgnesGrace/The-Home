const express = require('express');
const homeController = require('../controllers/home-controller');

const router = express.Router();
//Middleware for id param
router.param('id', homeController.checkParamId);

router
  .route('/')
  .get(homeController.getAllHomes)
  .post(homeController.checkRequestBody, homeController.createHome);
router
  .route('/:id')
  .get(homeController.getHome)
  .patch(homeController.updateHome)
  .delete(homeController.deleteHome);

module.exports = router;
