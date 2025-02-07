const Tag = require("../models/tagSchema.js");

const tagController = {
  getAllTags: async (req, res) => {
    const tags = await Tag.find();

    if (tags.length > 0) {
      res.status(200).send({ msg: "Tags retrieved", tags: tags });
    } else {
      res.status(404).send({ msg: "No tags found" });
    }
  },
  createTag: async (req, res) => {
    const { name } = req.body;

    const tag = new Tag({ name });
    try {
      const result = await tag.save();
      if (result._id) {
        res.status(201).json({ msg: "Tag created", tag: result });
      } else {
        res.status(500).json({ msg: "Tag not created" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error creating tag", error: error.message });
    }
  },
  getTag: async (req, res) => {
    const { id } = req.params;
    let tag = await Tag.findById(id);
    if (tag) {
      res.status(200).send({ msg: "Tag found", tag: tag });
    } else {
      res.status(404).send({ msg: "No tag found" });
    }
  },
  updateTag: async (req, res) => {
    const { id } = req.params;
    const {name} = req.body

    const tag = await Tag.findByIdAndUpdate(id, {name:name})

    if(tag){
        res.status(202).send({msg: "Tag sucsessfully updated"})
    } else{
        res.status(500).send({msg: "nono work, might need sjappa"})
    }
  },
  deleteTag: async (req, res) => {
    const { id } = req.params;
    const tag = await Tag.findByIdAndDelete(id)
    if(tag){
        res.status(200).send({msg: "Tag gone, poof"})
    } else{
        res.status(500).send({msg: "i'd like to keep this tag actually"})
    }
  },
};

module.exports = tagController;
