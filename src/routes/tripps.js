const router = require('express').Router();
const handler = require('../handlers/tripps');
const isAuth = require('../utils/isAuth');

router.get('/shared-tripps',isAuth(), handler.get.sharedTripps);
router.get('/offer-tripp',isAuth(), handler.get.offerTripp);
router.get('/details-tripp/:id',isAuth(), handler.get.detailstripp);
router.get('/close-tripp/:id',isAuth(), handler.get.closedTripp);

router.post('/offer-tripp',isAuth(), handler.post.offerTripp);

module.exports = router;