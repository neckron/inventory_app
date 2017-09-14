var mongoose = require('mongoose');
var Item = require('../model/InventoryItem');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.registerItem = function(req , res){
    var item = new Item();
    item.serialNumber = req.body.serialNumber;
    item.description = req.body.description;
    item.creationDate = new Date();

    item.save(function(err){
        res.status(200);
        res.json({"message" : "Item created"});
    });
}


module.exports.findItemById = function(req,res){
  Item.findOne({_id : req.params.id } , function(err , p){
    if(!p){
      res.status(400).send({'message' : 'Cant find item'});
    }else{
      res.status(200).jsonp(p);
    }
  })
}

module.exports.findAll = function(req,res){
  Item.find({} , function(err , p){
    if(!p){
      res.status(400).send({'message' : err});
    }else{
      res.status(200).jsonp(p);
    }
  })
}



