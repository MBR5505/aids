const Tag = require("../models/tagSchema.js");

const tagController = {
    getAllTags: (async (req, res) => {
        const tags = await Tag.find();

        if (tags.length > 0) {
            res.status(200).send({ msg: "Tags retrieved", tags: tags });
        } else {
            res.status(404).send({ msg: "No tags found" });
        }
    }),
    createTag: (async (req, res) => {
        const { name } = req.body;

        const tag = await new Tag({name})
        const result = tag.save();

        if(result._id) {
            res.status(201).send({ msg: "Tag created", tag: result });
        }
    }),
    getTag: (async (req, res) => {
        const { id } = req.params;
    }),
    updateTag: (async (req, res) => {
        const { id } = req.params;
    }),
    deleteTag: (async (req, res) => {
        const { id } = req.params;
    })
}

module.exports = tagController;