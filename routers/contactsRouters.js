const express = require('express');
const Contact =require('../models/contactsModel.js')
const router = express.Router();

router.post('/',async (req,res)=>{
    try{
        const {name,email,phone,company,job_title}=req.body
        const newContact=new Contact({name,email,phone,company,job_title})
        await newContact.save()
        const contacts= await Contact.find()
        res.json(contacts)
    }
    catch (error){
        res.status(500).json([{message:"Could not add contact",error}])
    }
})

router.get('/',async (req,res)=>{
    try{
        const contacts= await Contact.find()
        res.json(contacts)
    }
    catch (error){
        res.status(500).json([{message:"Could not fetch contacts",error}])
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const contact= await Contact.findById(id)
        res.json(contact)
    }
    catch (error){
        res.status(500).json([{message:"Could not fetch contacts",error}])
    }
});

router.put('/:id',async (req,res)=>{
    try {
        const id=req.params.id
        const updatedInfo=req.body
        await Contact.findOneAndReplace({_id:id},updatedInfo)
        const contacts=await Contact.find()
        res.json(contacts)
    } catch (error) {
        res.status(500).json([{message:"Could not update contact",error}])
    }
})

router.delete('/',async (req,res)=>{
    try {
        const {ids}=req.body
        await Contact.deleteMany({_id:{"$in":ids}})
        const contacts=await Contact.find()
        res.json(contacts)
    } 
    catch (error) {
        res.status(500).json([{message:"Could not delete the contact",error}])
    }
})
module.exports=router