const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
            model: Product,
            attributes: [
                'product_name',
                
            ],
        },]}
    )
    const Categories = categoryData.map((user) => user.get({ plain : true}))
    res.status(200).json(Categories)
} catch (err) {
    res.status(500).json({message:'an error occurred, please try again.'})
}
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id,{
      include: [
        {
            model: Product,
            attributes: [
                'product_name',
                
            ],
        },]}
    )
    const Categories = categoryData.get({ plain : true})
    res.status(200).json(Categories)
} catch (err) {
    res.status(500).json({message:'an error occurred, please try again.'})
    console.log(err)
}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(
        req.body,
    )
    console.log(newCategory);
    res.status(200).json(newCategory);
} catch (err) {
    console.log(err);
    res.status(500).json({message:err});
}
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(
        req.body, {
          where: { id: req.params.id }
        }
    )
    console.log(updateCategory);
    res.status(200).json(updateCategory);
} catch (err) {
    console.log(err);
    res.status(500).json({message:err});
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({where: {id: req.params.id}})
    res.status(200).json(categoryData)
} catch (err) {
    res.status(500).json({message:'an error occurred, please try again.'})
    console.log(err)
}
});

module.exports = router;
