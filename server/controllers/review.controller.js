const Review = require("../models/reviewSchema")

const reviewController = {
    getReviewsByGame: (async ()=>{

    }),
    getReviewsByUser: (async ()=>{

    }),
    getReview: (async ()=>{

    }),
    deleteReview: (async ()=>{

    }),
    createReview: (async (req, res)=>{
        const {id} = req.params
        const {gameId} = req.body
        const email = req.user.email
        const {comment, recomended, stars} = req.body


        let userId = User._id

        await Review.create({
            user: userId,
            game: gameId,
            comment: comment,
            recomended: recomended,
            stars: stars
        })
        Review.save();

        console.log(req.body);

        res.send("OK")
    })
}

module.exports = reviewController