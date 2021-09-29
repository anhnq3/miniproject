const express = require('express')
const Photo = require('./photo')

const router = express()

const Delete = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Photo.findByIdAndDelete(id)
        return result == null? res.send('Photo not found') : res.send('Deletted')    
    } catch (err) 
    {
        res.send(err)
    }
}


// Update
const Update = async (req, res) => {
    try{
        const id = req.params.id
        const updates = {...req.body, "updateAt": new Date}
        const options = {new: true}

        const result = await Photo.findByIdAndUpdate(id, updates, options)
        res.send(result)
    }
    catch(err){
        res.send(err)
    }
}

// All photo data
const Allphoto = async (req, res) => {
    try
    {
        const photos = await Photo.find()
        res.json(photos)    
    }
    catch(err)
    {
        res.json(err)
    }
}

// add-photo
const Addphoto = async (req, res) => {
    const photo = new Photo({
        name: req.body.name,
        userId: req.body.userId,
        albumId: req.body.albumId,
        link: req.body.link,
        createAt: new Date,
        updateAt: new Date,
        status: req.body.status
    })
    try
    {
        const savePhoto = await photo.save()
        res.send(`Photo have been saved: ${savePhoto}`)
    }
    catch(err)
    {
        res.send(err)
    }
}

module.exports = {
    Delete,
    Update,
    Allphoto,
    Addphoto
}