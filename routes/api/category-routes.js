const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories/` endpoint

// router.get('/', (req, res) => {
//   // find all categories
//   // be sure to include its associated Products
//   Category.findAll({
//     include: [Product]
//   })
//     .then((categories) => res.json(categories))
//     .catch((err) => res.status(500).json(err))
// });

router.get('/', async (req, res) => {

  try {
    const categories = await Category.findAll({
      include: [Product]
    })

    res.status(200).json(categories)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  console.log("id to find from url", req.params.id)
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    })

    res.status(200).json(category)
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  console.log("Category name that we want in the DB", req.body)
  try {
    const category = await Category.create(req.body)

    res.status(200).json(category)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    res.status(200).json(category)
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json(category)
  }
  catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
