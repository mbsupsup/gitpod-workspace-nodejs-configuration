const express = require ('express');
const router = express.Router();

router.get('/contact', function(req, res){
    res.send({type: 'GET'});
});

router.post('/contact', function(req, res){
    res.send({type: 'POST'});
});

router.put('/contact/:contactId', function(req, res){
    res.send({type: 'PUT'});
});

router.delete('/contact/:contactId', function(req, res){
    res.send({type: 'DELETE'});
});

module.exports = router;