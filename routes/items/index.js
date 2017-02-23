var express = require('express');
var router = express.Router();
var models = require('../../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Item.findAll().then(function(items) {
    res.render('items/index', { title: 'Test', items: items });
  })
});

router.get('/add', function(req, res, next) {
  res.render('items/add', { title: 'Express' });
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

router.get('edit/:id', function(req, res, next) {
  models.Item.findOne(req.params.id).then(function(item) {
    res.redirect('items/edit')
  })
})

module.exports = router;
