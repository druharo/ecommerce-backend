const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({ include: 'Products' });
    if (!data) {
      res.status(404).json({ message: 'No categories' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findByPk(req.params.id, { include: 'Products' });
    if (!data) {
      res.status(404).json({ message: 'No category by this id' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  /* req.body JSON should look like this...
  {
    "category_name": "New Category Name"
  }
  */
  if (!req.body.category_name) {
    return res.status(400).json({ message: "category_name is required" });
  }
  Category.create(req.body)
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  /* req.body JSON should look like this...
  {
    "id": <ID>,
    "category_name": "New Category Name"
  }
  */
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      return res.status(204).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(204).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
