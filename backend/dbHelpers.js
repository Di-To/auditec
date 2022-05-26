const knex = require('knex');
const config = require('./knexfile')
const db = knex(config.development)

function getAllTrees() {
    return db('trees')
}

async function addTree(tree) {
    await db('trees').insert(tree)
    return db('trees').where({latitude:tree.latitude})
}

function getTreeById(id){
    return db('trees').where({id:id}).first()
}

function deleteTree(id){
    return db('trees').where({id:id}).del()
}

module.exports = {
    getAllTrees,
    addTree,
    getTreeById,
    deleteTree
}