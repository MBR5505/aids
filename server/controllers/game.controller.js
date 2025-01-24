const Game = require("../models/game.model.js");


const gameController = {
    getAllGames: (async (req, res) => {
        const games = await Game.find();

        if (games.length > 0) {
            res.status(200).send({ msg: "Games retrieved", games: games });
        } else {
            res.status(404).send({ msg: "No games found" });
        }
    }),
    createGame: (async (req, res) => {
        const { title, price, discount,publisher, developer, releaseDate, status, description, shortDescription } = req.body;

        const game = new Game({
            title,
            price, 
            discount,
            publisher, 
            developer, 
            releaseDate, 
            status, 
            description, 
            shortDescription
        })

        let result = await game.save();
        console.log(result);

        if (result._id) {
            res.status(201).send({ msg: "Game created", game: game });
        } else {
            res.status(500).send({ msg: "Game not created" });
        }

    }),
    getGame: (async (req, res) => {
        const { id } = req.params;

        const game = await Game.findById(id);
        console.log(game);

        res.status(200).send({ msg: "Game retrieved", game: game });
    }),
    editGame: (async(req, res) => {
        const { id } = req.params;
        const updateContent = req.body;

        try {
            const game = await Game.findByIdAndUpdate(id, updateContent);
            console.log(game, "UPDATING...");
            res.status(200).send({ msg: "Game updated"});
        } catch (error) {
            console.log(error)
        };

    }),
    deleteGame: ( async (req, res) => {
        const { id } = req.params;

        const game = await Game.findByIdAndDelete(id);

        res.status(200).send({ msg: "Game deleted", game: game }); 

    })
};

module.exports = gameController;