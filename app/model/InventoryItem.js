var mongoose = require( 'mongoose' );
require('dotenv').config();

var Schema = mongoose.Schema;

var inventoryItemSchema = new mongoose.Schema({
  serialNumber : {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creationDate : Date
});

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
