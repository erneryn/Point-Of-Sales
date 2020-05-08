const Item = require('../model/item')

class itemController{
    static async getAllItem(req,res,next){
        try {
            const allItem = await Item.find().populate('category')
            res.status(200).json(allItem)
        } catch (error) {
            res.send(error)        }
    }

    static async getOneItem(req,res,next){
        try {
            const itemId = req.params.id
            const item = await Item.findById(itemId).populate('category')
            if(item == null){
                res.status(404).json({ "message": "data not found"})
            }
            res.status(200).json(item)
        } catch (error) {
            res.send(error)
        }
    }

    static async postItem(req,res,next){
        try {
            const newItem = new Item ({
                name : req.body.name,
                prize: req.body.prize,
                stock: req.body.stock,
                cost: req.body.cost,
                category: req.body.categoryId
            })
            const item = await Item.create(newItem)
            res.status(200).json(item)
        } catch (error) {
            res.send(error)
        }
    }

    static async putItem(req,res,next){
        try {
            const willUpdate = {
                name : req.body.name,
                prize: req.body.prize,
                stock: req.body.stock,
                cost: req.body.cost,
                category: req.body.categoryId
            }
            await Item.findOneAndUpdate({_id: req.params.id},willUpdate,{new:true, runValidators: true},(err,doc)=>{
            if(err){
                next(err)
            }
            res.status(201).json(doc)
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteItem(req,res,next) {
        console.log(req.body.itemId)
        await Item.deleteMany(
            { 
                _id :{
                     $in: req.body.itemId
                    }
                },
                (err,result)=>{
            if(err){
                next(err)
            }
            res.status(201).json(result)
        })
    }
}

module.exports = itemController