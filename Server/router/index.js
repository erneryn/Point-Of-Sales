const Router = require('express').Router()
const itemController = require('../controller/item')
const categoryController = require('../controller/category')

Router.get('/items', itemController.getAllItem)
Router.get('/items/:id', itemController.getOneItem)
Router.post('/items', itemController.postItem)
Router.put('/items/:id',itemController.putItem)
Router.delete('/items',itemController.deleteItem)

Router.get('/category', categoryController.getAllCat)
Router.post('/category', categoryController.postCat)
Router.get('/category/:id', categoryController.getOneCat)
Router.put('/category/:id', categoryController.putCat)
Router.delete('/category/:id', categoryController.deleteCat)



module.exports = Router