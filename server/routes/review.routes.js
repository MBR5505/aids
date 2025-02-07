const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review.controller");
const verifyJWT = require("../middleware/verifyToken");

router.get("/games/:id", reviewController.getReviewsByGame);
router.get("/user/:id", reviewController.getReviewsByUser);

router.post("/gameId", verifyJWT, reviewController.createReview)
router.get("/:id", reviewController.getReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router