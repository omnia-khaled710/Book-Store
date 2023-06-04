const mongoose = require('mongoose');


const authorSchema = new mongoose.Schema({
  firstName:{
      type: 'string'
  },
  lastName:{type: 'string'},
  dateOfBirth:{type: 'Date'},
  breif:{type: 'string',required: true},
  Image:{type:'string',default:"default-avatar.png"}
},{
  timestamps:true
});

const authorModel = mongoose.model('author', authorSchema);
module.exports = authorModel;