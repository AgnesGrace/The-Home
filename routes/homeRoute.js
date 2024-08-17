const express = require('express');
const homeController = require('../controllers/home-controller');

const router = express.Router();

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
