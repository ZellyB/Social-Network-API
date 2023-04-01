const router = require(`express`).Router()
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require(`../../controllers/toughtsController`)
// route for /api/thoughts 
router.route(`/`).get(getThoughts).post(createThought)

// route for /api/thoughts/:thoughtId
router.route(`/:thoughtId`).get(getSingleThought).put(updateThought).delete(deleteThought)

// route for /api/thoughts/:thoughtId/reactions
router.route(`/:thoughtId/reactions`).post(createReaction)

// route fpr /api/thoughts/:thoughtId/reactions/:reactionId
router.route(`/:thoughtId/reactions/:reactionId`).delete(deleteReaction)

module.exports = router