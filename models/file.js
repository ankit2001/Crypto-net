const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  file:{
      type:Buffer,
  },
  name:{
    type:String
  }
  
});

const fileUpload = mongoose.model('fileUpload', fileSchema);

module.exports = fileUpload;
