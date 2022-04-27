const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

try {
  const tag = await Tag.findAll({
    
    include: [Product]
  })
  res.status(200).json(tag)
}
catch (err) {
  res.status(400).json(err)
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    })
    res.status(200).json(tag)
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag

  console.log("Tag name that we want in the DB", req.body)
  try {
    const tag = await Tag.create(req.body)

    res.status(200).json(tag)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value

  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    res.status(200).json(tag)
  }
  catch (err) {
    res.status(400).json(err)
  }
});
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json(tag)
  }
  catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
