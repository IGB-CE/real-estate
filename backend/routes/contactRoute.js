const express = require("express");
const contactModel = require("../models/contact.js");

const app = express()

app.post('/addContact', async(req,res)=>{
    try{
        const newContact = new contactModel(req.body)
        await newContact.save()
        res.status(200).send(newContact)
    }catch(err){
        res.status(500).send("Contact not saved ", err)
    }
})

module.exports = app