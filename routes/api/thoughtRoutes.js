const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReacion,
    removeReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .delete(deleteThought)
    .put(updateThought);

router.route('/:thoughtId/reactions').post(addReacion);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;