var express = require('express');
var router = express.Router();
var models = require('../../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Item.findAll({
    include: [{model: models.Category}]
  }).then(function(items) {
    res.render('items/index', { title: 'Test', items: items });
  })
});

router.get('/add', function(req, res, next) {
  models.Category.findAll().then(function(cat) {
    res.render('items/add', { title: 'Express', category: cat });
  })
});

router.post('/add', function(req, res, next) {
  models.Item.create({
    name: req.body.name,
    quantity: req.body.quantity,
    CategoryId: req.body.CategoryId
  }).then(function() {
    res.redirect('/items')
  })
})

router.get('/delete/:id', function(req, res, next) {
  models.Item.destroy({
    where: {id: req.params.id}
  }).then(function() {
    res.redirect('/items')
  })
})

router.get('/edit/:id', function(req, res, next) {
  models.Item.findById(req.params.id).then(function(item) {
    models.Category.findAll().then(function(category) {
      res.render('items/edit', {category: category, item: item})
    })
  })
})

router.post('/update/:id', function(req, res, next) {
  models.Item.update({
    name: req.body.name,
    quantity: req.body.quantity,
    CategoryId: req.body.CategoryId,
  }, {where: {id: req.params.id}}).then(function() {
    res.redirect('/items')
  })
})

module.exports = router;
