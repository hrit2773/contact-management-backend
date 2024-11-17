const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String,required:true,unique:true},
    company:{type:String,required:true},
    job_title:{type:String,required:true},
});

const contact = mongoose.model('Contact', contactsSchema);

module.exports = contact;