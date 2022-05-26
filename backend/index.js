
const { json } = require('body-parser');
const express = require('express');
const app = express();
const PORT = 5002
app.use(express.json())
const Trees = require('./dbHelpers');
const bodyParser = require('body-parser');
app.use(bodyParser.json())



app.get('/', (req, res) => {
    res.status(200).json({message: "Hello world"})
})

app.get('/trees', (req, res) => {
    Trees.getAllTrees()
    .then(trees=>{
        res.status(200).json(trees)
    })
    .catch(error=> res.status(500).json(error))
})


app.post('/trees/add', (req, res) => {
    
    const credentials = req.body

    Trees.addTree(credentials)
    .then(tree=>{
        res.status(200).json(tree)
    })
    .catch(error=> res.status(500).json(error))

})

app.get('/trees/:id', (req,res) =>{
    const {id} = req.params 

    Trees.getTreeById(id) 
    .then(tree => {
        res.status(200).json(tree)
    })
    .catch(error=> res.status(500).json(error))
})

app.delete('/trees/delete/:id', (req, res) => {
    const {id} = req.params

    Trees.deleteTree(id) 
    .then(tree => {
        res.status(200).json(tree)
    })
    .catch(error=> res.status(500).json(error))
    
})


app.listen(PORT, ()=>{
    console.log(`server running in port ${PORT}`)
})