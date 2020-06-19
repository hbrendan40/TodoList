const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

//get route
router.get('/', (req, res) => {
    
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items));
});
//post route
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save()
    .then(item=> res.json(item));
});

//delete routes
router.delete('/:id', (req, res) => {
 Item.findById(req.params.id)
 .then(item => item.remove().then(() => res.json({success: true})))
 .catch(err => res.status(404).send({success:false}))
});



module.exports = router;