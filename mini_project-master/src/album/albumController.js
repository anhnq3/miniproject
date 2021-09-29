const express = require('express')
const Album = require('./album')
const UserAlbum = require('../useralbum/useralbum')
const mongoose = require('mongoose')

const router = express()

// Delete
router.delete('/album/remove/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await Album.findByIdAndDelete(id) 
        return result == null? res.send('Album id not found') : res.send('Deletted')
    } catch (err) 
    {
        res.send(err)
    }
})

// Update
router.patch('/album/:id', async (req, res) => {
    try{
        const id = req.params.id
        const updates = {...req.body, "updateAt": new Date}
        const options = {new: true}

        const result = await Album.findByIdAndUpdate(id, updates, options)
        res.send(result)
    }
    catch(err){
        res.send(err)
    }
})


router.get('/album', async (req, res) => {
    try
    {
        const albums = await Album.find()
        res.json(albums)    
    }
    catch(err)
    {
        res.json(err)
    }
})

router.post('/add-album', async (req, res) => {
    // Tạo bản ghi useralbumm trên database
    const album_id = new mongoose.Types.ObjectId()
    
    const user_album = new UserAlbum ({
        userId: req.body.userId,
        albumId: album_id
    })
    try
    {
        await user_album.save()
    }
    catch(err)
    {
        res.json(err)
    }

    const album = new Album({
        _id: album_id,
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        createAt: new Date,
        updateAt: new Date,
        status: req.body.status
    })

    try
    {
        const saveAlbum = await album.save()
        res.send(`Album have been saved: ${saveAlbum}`)
    }
    catch(err)
    {
        res.send(err)
    }
})

module.exports = router