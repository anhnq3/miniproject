const express = require('express')
const Useralbum = require('./useralbum')

const router = express()

const Delete = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Useralbum.findByIdAndDelete(id) 
        return result == null? res.send('Useralbum id not found') : res.send('Deletted')
    } catch (err) 
    {
        res.send(err)
    }
}

// All photo data
const all =  async (req, res) => {
    try
    {
        const useralbum = await Useralbum.find()
        res.json(useralbum)    
    }
    catch(err)
    {
        res.json(err)
    }
}

module.exports = {
    Delete,
    all
}