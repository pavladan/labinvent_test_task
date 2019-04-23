const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const WifiSchema = new Schema(
  {
    "favorite": Boolean,
    "name": String,
    "strength": Number,
    "security": Array
  }
)
module.exports = mongoose.model ('WifiItem',WifiSchema);
